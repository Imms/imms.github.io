/**
 * Created by GregRos on 24/05/2016.
 */
"use strict";
class Serializer {
    static fill(from, to) {
        for (var propName in from) {
            if (!from.hasOwnProperty(propName))
                continue;
            to[propName] = from[propName];
        }
        return to;
    }
    static fromYaml(text, T) {
        var jsonObj = YAML.parse(text);
        return Serializer.fill(jsonObj, new T());
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=serialization.js.map