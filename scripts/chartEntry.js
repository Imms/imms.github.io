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
                suite: suite.suite,
                targets: suite.targets,
                groups: []
            };
            for (let group of suite.groups) {
                const newGroup = {
                    group: group.group,
                    tests: []
                };
                for (let test of group.tests) {
                    const resultsOfTest = arr.filter(x => x.Test === test.test).map(x => {
                        const result = {
                            result: x.Time.Fields[0],
                            footnote: "sdf",
                            target: x.Target
                        };
                        return result;
                    });
                    const newTest = {
                        results: resultsOfTest,
                        test: test.test
                    };
                    newGroup.tests.push(newTest);
                }
                newSuite.groups.push(newGroup);
            }
            return newSuite;
        });
    }
    static loadSuite1() {
        let promisedSuite = helpers_1.Requests.request("/data/testSuites.yaml").then(YAML.parse).then(x => x.sequentials);
        return promisedSuite.then(suite => {
            return TestSuites.loadSuite("/data/exampleBenchmarkData.json", suite);
        });
    }
}
exports.TestSuites = TestSuites;
//# sourceMappingURL=chartEntry.js.map