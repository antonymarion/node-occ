const should = require("should");
const sr = require("../lib/scriptrunner");
const nodeocc = require("..");
describe("Script Runner", function () {
    let runner;
    let myEnv = {foo: "bar"};

    before(function () {
        runner = new sr.ScriptRunner(myEnv);
    });

    it("should not be possible load external module with require", function (done) {

        runner.run("let fs= require('fs');", function () {
            should.fail("done callback");
            done(new Error("test has failed: 'require' call hasn't been intercepted"));
        }, function error_callback(err) {
            should.exist(err);
            err.message.should.equal("require is forbidden");
            done(null); //
        });
    });
    it("should not be possible to use eval", function (done) {

        runner.run("eval('a=10');",

            function () {
                should.fail("done callback");
                done(new Error("test has failed: 'eval' call hasn't been intercepted"));
            },
            function error_callback(err) {
                should.exist(err);
                err.message.should.equal("eval is forbidden");
                done(null); //
            }
        );

    });
    it("should expose environment provided by the caller", function (done) {

        runner.env.logs = []; // purge log
        runner.env.logs.length.should.equal(0);
        runner.env.foo.should.equal("bar");
        runner.run("console.log(foo); foo='baz'",

            function () {

                runner.env.foo.should.equal("baz");
                runner.env.logs.length.should.equal(1);

                done();
            },
            function error_callback(err) {
                done(err); //  should not fail
            }
        );

    });
    it("runLinuxCone - should not fail with cone radius2=0", function (done) {

        const fast_occ = nodeocc.fastBuilder.occ;

        const myRunner = new sr.ScriptRunner(
            {
                foo: "bar",
                csg: fast_occ,
                occ: fast_occ,
                data: [],
                display: function (shape, metaData) {

                    if (typeof (metaData) !== "string") {
                        throw new Error("Internal Error, expecting a meta data of type string");
                    }
                    if (!shape || !shape instanceof fast_occ.Solid) {
                        throw new Error("Internal Error, expecting a shape");
                    }

                    shape._id = metaData;
                    myRunner.env.data.push({shape: shape, id: metaData, hash: shape.hash});
                },
            }
        );
        myRunner.env.logs = []; // purge log
        myRunner.run("var myShape = occ.makeCone([0, 0, 0], 2, [0, 0, 2], 0);display(myShape,'3c918f6c-1abe-4918-e05c-db3d9f0025e6')",

            function () {

                const data = myRunner.env.data;
                console.log("data", data);
                console.log(myRunner.env.logs);

                Object.keys(data[0].shape.faces).length.should.be.eql(2);


                done();
            },
            function error_callback(err) {
                done(err); //  should not fail
            }
        );

    });
});
