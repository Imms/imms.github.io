// Learn more about F# at http://fsharp.org
// See the 'F# Tutorial' project for more help.
open FSharp.Data
open System.IO
open FSharp.Text.RegexProvider

open System.Collections.Generic
let pathRoot = @"html"
open System
open System.Linq
type MemberKind =
| Type
| Method
| Property
| Event
| Overload
| Namespace
| Other
    override x.ToString() = 
        match x with
        | Type -> "T"
        | Method -> "M"
        | Property -> "P"
        | Overload -> "M"
        | Namespace -> "N"
        | _ -> failwith "Unknown"

    member x.Order = 
        match x with
        | Other -> -100
        | Namespace -> -1
        | Type -> 0
        | Overload -> 1
        | Method -> 2
        | Property -> 3
        | Event -> 4

    static member Parse str =
        match str with
        | "M" -> Method
        | "P" -> Property
        | "E" -> Event
        | "T" -> Type
        | "N" -> Namespace
        | "Overload" -> Overload
        | _ -> Other
        
type IMemberEntry = 
    abstract Kind : MemberKind
    abstract Raw : string with get, set
    abstract ResolvedName : string

type TypeEntry = 
    {
        typeNamespace : string
        typeName : string
        mutable raw : string
    } 
    interface IMemberEntry with
        member x.Kind = Type
        member x.Raw 
            with get() = x.raw
            and set v = x.raw <- v
        member x.ResolvedName = x.ResolvedName
    member x.ShortName = 
        sprintf "%s%s" x.typeNamespace x.typeName

    member x.ResolvedName = sprintf "%O:%s" Type x.ShortName 

type NamespaceEntry = 
    {
        name : string
        mutable raw : string
    }
    interface IMemberEntry with
        member x.Kind = Namespace
        member x.Raw 
            with get() = x.raw
            and set v = x.raw <- v
        member x.ResolvedName = x.ResolvedName
    member x.ShortName =
        x.name

    member x.ResolvedName = sprintf "%O:%s" Namespace x.ShortName


type MemberEntry = 
    {
        memberKind : MemberKind
        typeEntry : TypeEntry
        memberName : string
        memberSig : string option
        mutable raw : string
    }
    interface IMemberEntry with
        member x.Kind = x.memberKind
        member x.Raw 
            with get() = x.raw
            and set v = x.raw <- v
        member x.ResolvedName = x.ResolvedName
    member x.Name = 
        let withoutSig = sprintf "%s.%s" x.typeEntry.ShortName x.memberName
        match x.memberSig with
        | None -> withoutSig
        | Some signature -> sprintf "%s%s" withoutSig signature

    member x.ResolvedName = sprintf "%O:%s" x.memberKind x.Name 
       

type MetaRegex = Regex<"^(?<memberCode>.*?):(?<memberId>.*)$">

type TypeRegex = Regex<"^(?<typeNamespace>[\w.\d'_]+\.)?(?<typeName>[\w.\d'_]+)$">

type MemberRegex = Regex<"^(?<typeName>[\w.\d'_]+)\.(?<memberName>[^(']+)(?<memberSig>(''\d*)?(\(.*)?)?$">

let metaRegex = MetaRegex()
let typeRegex = TypeRegex()
let memberRegex = MemberRegex()

//AbstractIterable(TElem, TIterable, TBuilder)._Select(TElem2, TRSeq) Method

let extractNamespace nm = 
    {
        name = nm
        raw = nm
    }

let extractType typ = 
    let r = typeRegex.Match(typ)
    {
        typeNamespace = r.typeNamespace.Value
        typeName = r.typeName.Value
        raw = typ
    }

let extractMember kind mem =
    let r = memberRegex.Match(mem)
    {
        memberKind = kind
        typeEntry = extractType(r.typeName.Value)
        memberName = r.memberName.Value
        raw = mem
        memberSig = 
            if r.memberSig.Success && r.memberSig.Value <> "" then
                if not <| r.memberSig.Value.Contains("(") then
                    r.memberSig.Value + "()" |> Some
                else
                    r.memberSig.Value |> Some
            elif kind = Method then
                Some "()"
            else
                None
    }
let replaceAll (all : string list) (withWhat : string) (str : string) =
    let r = all |> List.fold (fun (cur : string) what -> cur.Replace(what, withWhat)) str
    
    let x = 5
    r.Replace("`", "'") //.Replace("(", "[").Replace(")", "]")
    
let replaceCommonStrings str = 
    str |> replaceAll ["Collections.Generic."; "System."; "Imms."; "Abstract."] ""

let extractMeta m = 
    let r = metaRegex.Match(m)
    let rest = r.memberId.Value
    let kind = MemberKind.Parse (r.memberCode.Value)
    let extracted = 
        match kind with
        | Other -> failwith "Other"
        | Type -> extractType rest :> IMemberEntry
        | Namespace -> extractNamespace rest :> IMemberEntry
        | kind -> extractMember kind rest :> IMemberEntry
    extracted.Raw <- m
    extracted

let parseMetaString (html : HtmlDocument) =
    let metaWeWant = 
        html.Descendants("meta") 
        |> Seq.where (fun meta -> meta.AttributeValue("name") = "Microsoft.Help.Id")
        |> Seq.exactlyOne
    metaWeWant.Attribute("content").Value()  |> replaceCommonStrings



let startsWithAny whats (str : string) = 
    whats |> Seq.exists (str.StartsWith)

let anyKeyOf (keys : _ list) (m : Map<_,_>) =
    keys |> List.choose (m.TryFind)

let okayPrefixes = ["M_"; "P_"; "T_"; "Overload_"; "N_"]

[<EntryPoint>]
let main argv = 
    let index = Map.empty
    let loc = @"D:\Projects\Repositories\Imms\API"
    let eligibleFiles = 
        Directory.EnumerateFiles(loc + @"\html")
        |> Seq.where (Path.GetFileName >> startsWithAny okayPrefixes)

    let index = Dictionary()

    let metas = 
        eligibleFiles 
        |> Seq.map (fun file -> file |> Path.GetFileNameWithoutExtension, file |> HtmlDocument.Load |> parseMetaString |> extractMeta)

    let groups = 
        metas |> Seq.groupBy (snd >> fun x -> x.Kind) 
        |> Map.ofSeq

    for target, item in groups |> anyKeyOf [Type; Namespace; Overload; Event] |> Seq.collect id do
        let target = target
        let item = item
        index.Add(item.ResolvedName, target)

    for target, item in groups |> anyKeyOf [Method; Property] |> Seq.collect id do
        
        let memberItem = item :?> MemberEntry
        if memberItem.memberName.Contains("NoneOf") then
            let df = 54
            ()
        let memberWithoutSig = {memberItem with memberSig = None}.ResolvedName
        if (not <| index.ContainsKey(memberWithoutSig)) && memberItem.memberSig.IsSome then
            //if we've found an Overload entry for this member, it's overloaded.
            //otherwise, it's not overloaded
            index.Add(memberWithoutSig, target)

        index.Add(memberItem.ResolvedName, target)

    let serializer = Newtonsoft.Json.JsonSerializer.Create()
    use stream = new StreamWriter(File.Open("..\..\..\..\API\index.json", FileMode.Create))
    serializer.Formatting <- Newtonsoft.Json.Formatting.Indented
    serializer.Serialize(stream, index)
    stream.Flush()
    printfn "%A" argv
    0 // return an integer exit code
