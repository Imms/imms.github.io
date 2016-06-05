/**
 * Created by GregRos on 27/05/2016.
 */
"use strict";
const helpers_1 = require('./helpers');
class TestSuites {
    static byName(arr, name) {
        return arr.find(x => x.name == name);
    }
    static loadSuite(url, suite) {
        return helpers_1.Requests.requestJSON(url).then(data => {
            const arr = data;
            const newSuite = {
                name: suite.name,
                targets: suite.targets,
                groups: []
            };
            for (let group of suite.groups) {
                const newGroup = {
                    name: group.name,
                    tests: []
                };
                for (let test of group.tests) {
                    const resultsOfTest = arr.filter(x => x.Test === test.name).map(x => {
                        const result = {
                            result: x.Time.Fields[0],
                            footnote: "sdf",
                            name: x.Target
                        };
                        return result;
                    });
                    const newTest = {
                        results: resultsOfTest,
                        name: test.name
                    };
                    newGroup.tests.push(newTest);
                }
                newSuite.groups.push(newGroup);
            }
            return newSuite;
        });
    }
    static loadSuite1() {
        return TestSuites.loadSuite("/data/exampleBenchmarkData.json", {
            targets: [
                { name: 'System.ImmutableList' },
                { name: 'ImmList' },
                { name: 'ImmVector' }
            ],
            name: "sequence",
            groups: [{
                    name: "AddRemoveSingle",
                    tests: [
                        { name: "AddLast" },
                        { name: "AddFirst" },
                        { name: "RemoveLast" },
                        { name: "RemoveFirst" }
                    ] }, {
                    name: "AddRemoveMany",
                    tests: [
                        { name: "AddLastRange" },
                        { name: "AddFirstRange" },
                        { name: "Skip" },
                        { name: "Take" }
                    ] }, {
                    name: "Indexing",
                    tests: [
                        { name: "Lookup" },
                        { name: "Update" },
                        { name: "Insert" },
                        { name: "InsertRange" },
                        { name: "Remove" }
                    ] }
            ]
        });
    }
}
exports.TestSuites = TestSuites;
//# sourceMappingURL=chartEntry.js.map