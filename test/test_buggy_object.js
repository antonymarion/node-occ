const assert = require("assert");
const should = require("should");

const occ = require("../lib/occ");


describe("testing a Buggy object that made failed COMMON and CUT operation ", function () {
    this.timeout(40000000);
    describe("Buggy object", function () {
        let data;
        before(function () {
            data = [{
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 378.4990829044983,
                    "volume": 221.67077763729583,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 369.4512960621597,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 4.523893421169301,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 4.523893421169301,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,0],[0,0,49],1.2)",
                    "uuid": "5eb15227d4434429c58547ce024c4af1e4dbea7e",
                    "_id": "b4828567-ae30-41f3-2424-2991e61c54d0"
                }, "id": "b4828567-ae30-41f3-2424-2991e61c54d0"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1162.3892818282236,
                    "volume": 2513.274122871834,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1005.3096491487339,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 78.53981633974483,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 78.53981633974483,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,49],[0,0,17],5)",
                    "uuid": "d5e8a64f1282b7d941c202d9cad8f5c325b571f1",
                    "_id": "50895165-5e99-46ec-62ea-dd907953696e"
                }, "id": "50895165-5e99-46ec-62ea-dd907953696e"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 427.2566008882119,
                    "volume": 402.12385965949346,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 402.1238596594935,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 12.566370614359167,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 12.566370614359167,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,49],[0,0,17],2)",
                    "uuid": "b8df6c19072e11796f238f012d0563e0e27392cf",
                    "_id": "f1a4f7a9-708d-4855-cce9-d98c7eeeb1a2"
                }, "id": "f1a4f7a9-708d-4855-cce9-d98c7eeeb1a2"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1188.8414919714492,
                    "volume": 2614.8103974358564,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1025.4158421317084,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 81.7128249198705,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 81.7128249198705,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,49],[0,0,17],5.1)",
                    "uuid": "415dd5fb9cd46bdda85ce9e8aa90686f476b757b",
                    "_id": "9f611637-efb9-41a3-f62a-bba71395ff49"
                }, "id": "9f611637-efb9-41a3-f62a-bba71395ff49"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1539.3804002589986,
                    "volume": 2111.1502632123406,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1005.3096491487339,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 65.97344572538566,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 65.97344572538566,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 402.1238596594935,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"d5e8a64f1282b7d941c202d9cad8f5c325b571f1\",\"b8df6c19072e11796f238f012d0563e0e27392cf\")",
                    "uuid": "1c57cf6f4e7178b8b1f69dec608adc1c7deeae6e",
                    "_id": "efbb6ec8-db15-45a3-4fb3-b9ea2a97477a"
                }, "id": "efbb6ec8-db15-45a3-4fb3-b9ea2a97477a"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 2037.0715084406938,
                    "volume": 101.5362745640216,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1025.4158421317084,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 3.173008580125696,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 3.173008580125696,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1005.3096491487339,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"415dd5fb9cd46bdda85ce9e8aa90686f476b757b\",\"d5e8a64f1282b7d941c202d9cad8f5c325b571f1\")",
                    "uuid": "44a2dcf26dad6c3c13f5a900293f1cdd854eaabf",
                    "_id": "a89a8344-bf12-4ba7-d43d-9583877b2bbe"
                }, "id": "a89a8344-bf12-4ba7-d43d-9583877b2bbe"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 454.65128882751486,
                    "volume": 732.870734229427,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 271.4336052701581,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 91.60884177867837,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 91.60884177867837,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-4,0,-5.4],[4,0,-5.4],5.4)",
                    "uuid": "370e79ef60ac5541af243ce8a34daf232ac6525c",
                    "_id": "98c9c832-793e-4e7c-e59f-0770fd634b5b"
                }, "id": "98c9c832-793e-4e7c-e59f-0770fd634b5b"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 466.52650905808423,
                    "volume": 760.2654221687299,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 276.46015351590177,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 95.03317777109125,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 95.03317777109125,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-4,0,-5.4],[4,0,-5.4],5.5)",
                    "uuid": "e17b1d7356155b2e5f3b37116ce535e09d9ee5ff",
                    "_id": "efadc78b-2616-4f20-94f9-6f62f94b8486"
                }, "id": "efadc78b-2616-4f20-94f9-6f62f94b8486"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 554.7424307708857,
                    "volume": 27.3946879393028,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 276.46015351590177,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 3.424335992412864,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 3.424335992412864,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 271.4336052701581,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"e17b1d7356155b2e5f3b37116ce535e09d9ee5ff\",\"370e79ef60ac5541af243ce8a34daf232ac6525c\")",
                    "uuid": "af68538fa8d258322a700823366eaa7c5ed57924",
                    "_id": "93a1c7eb-c74c-40e5-7c37-13256a5fa249"
                }, "id": "93a1c7eb-c74c-40e5-7c37-13256a5fa249"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 555.028989401434,
                    "volume": 27.08842109603694,
                    "numFaces": 9,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:1:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 272.1636895054415,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 3.424335992412864,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 3.424335992412864,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 271.4336052701581,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 0.07714443795169912,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m2:lateral:1": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 0.07714382470672085,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m2:lateral:2": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 0.15428876540522418,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m2:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2.137222806472562,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m2:bottom:1": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2.137222806472562,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"af68538fa8d258322a700823366eaa7c5ed57924\",\"5eb15227d4434429c58547ce024c4af1e4dbea7e\")",
                    "uuid": "03aec07c5c570c3a33b25e7143f1d0e00d9aa2cc",
                    "_id": "de8c9461-58de-439b-ed6d-c4a737784d7d"
                }, "id": "de8c9461-58de-439b-ed6d-c4a737784d7d"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 714,
                    "volume": 578,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 289,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 289,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeBox([-6,-8.5,-13.9],[-4,8.5,3.0999999999999996])",
                    "uuid": "9c2197227df0459ef5a61180a498b8a9f090dc96",
                    "_id": "9e48722d-390f-40ad-64ba-f13f9b821e63"
                }, "id": "9e48722d-390f-40ad-64ba-f13f9b821e63"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 729.2799999999999,
                    "volume": 591.68,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeBox([-6,-8.6,-14],[-4,8.6,3.1999999999999993])",
                    "uuid": "fd1fc5ca31593604ab737c50107e7c98fd5e4e08",
                    "_id": "68601754-72cf-43b7-5fa0-449e7a73c872"
                }, "id": "68601754-72cf-43b7-5fa0-449e7a73c872"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 287.27999999999986,
                    "volume": 13.679999999999836,
                    "numFaces": 10,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:back:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 6.839999999999918,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:front:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 6.839999999999918,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34.4,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"fd1fc5ca31593604ab737c50107e7c98fd5e4e08\",\"9c2197227df0459ef5a61180a498b8a9f090dc96\")",
                    "uuid": "c13e87c6275421183365f469e8a92d132b7eb441",
                    "_id": "9d17d826-5ef7-4cb8-2f20-39c5cda652b8"
                }, "id": "9d17d826-5ef7-4cb8-2f20-39c5cda652b8"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 714,
                    "volume": 578,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#9c2197227df0459ef5a61180a498b8a9f090dc96([-2,0,0])",
                    "uuid": "3ecead914f845ba41f2fdaac8015ceff5cb06ad4",
                    "_id": "0db11504-9895-4e05-5088-d6812b62d252"
                }, "id": "0db11504-9895-4e05-5088-d6812b62d252"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 736.16,
                    "volume": 621.2639999999998,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeBox([-8.1,-8.6,-14],[-6,8.6,3.1999999999999993])",
                    "uuid": "cd16baea0b4e86e1d1831b73a4f218c84ffce131",
                    "_id": "d86d44bd-498a-48b3-8e82-26a1da0826f4"
                }, "id": "d86d44bd-498a-48b3-8e82-26a1da0826f4"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 872.1599999999999,
                    "volume": 43.26399999999984,
                    "numFaces": 11,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:front:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 6.839999999999918,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:undefined": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"cd16baea0b4e86e1d1831b73a4f218c84ffce131\",\"3ecead914f845ba41f2fdaac8015ceff5cb06ad4\")",
                    "uuid": "e8370084b0effb147ff92736d4b1f2e865e8760d",
                    "_id": "c1fdf8ee-ecca-4a1b-78c4-3d6fb623039e"
                }, "id": "c1fdf8ee-ecca-4a1b-78c4-3d6fb623039e"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 936.0689470636146,
                    "volume": 2159.8198166017537,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 553.7999529748085,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 191.134497044403,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 191.134497044403,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-8.1,0,-5.4],[-19.4,0,-5.4],7.8)",
                    "uuid": "2d7f0d0c864b6b014ec13c1ea6a97cf2b46b7a87",
                    "_id": "a142e5a8-0fc2-41dc-ea46-df66fdbbc855"
                }, "id": "a142e5a8-0fc2-41dc-ea46-df66fdbbc855"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 804.876037849705,
                    "volume": 1739.4998522926685,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 496.9999577979052,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 153.93804002589985,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 153.93804002589985,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-8.1,0,-5.4],[-19.4,0,-5.4],7)",
                    "uuid": "f45aea757ec52f0d1a1362250b51a8a25e17872a",
                    "_id": "9c696ccd-9364-4e91-1db7-f167b7629291"
                }, "id": "9c696ccd-9364-4e91-1db7-f167b7629291"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1125.19282480972,
                    "volume": 420.3199643090852,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 553.7999529748085,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 37.19645701850314,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 37.19645701850314,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 496.9999577979052,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"2d7f0d0c864b6b014ec13c1ea6a97cf2b46b7a87\",\"f45aea757ec52f0d1a1362250b51a8a25e17872a\")",
                    "uuid": "f375988a579c2fdc7d3d187a8239aea439be6568",
                    "_id": "5e0a0f1b-88b9-427f-e57b-7a156071d617"
                }, "id": "5e0a0f1b-88b9-427f-e57b-7a156071d617"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 789.0424108756124,
                    "volume": 1690.1548564827335,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 489.8999584007924,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 149.57122623741003,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 149.57122623741003,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-8.1,0,-5.4],[-19.4,0,-5.4],6.9)",
                    "uuid": "25905fc82ca50bbcaaefec75760c23d64bf63ab3",
                    "_id": "2be0a277-3929-4feb-a687-afeba19a2779"
                }, "id": "2be0a277-3929-4feb-a687-afeba19a2779"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 773.3344476076634,
                    "volume": 1641.5198606125095,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 482.79995900367936,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 145.267244301992,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 145.267244301992,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-8.1,0,-5.4],[-19.4,0,-5.4],6.8)",
                    "uuid": "1cbdeedd51fc97d7a810f101afd1774ef109e4c1",
                    "_id": "55552e20-ae57-4cc2-40bf-70c0f28d94b8"
                }, "id": "55552e20-ae57-4cc2-40bf-70c0f28d94b8"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 981.3078812753079,
                    "volume": 48.63499587022375,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 489.8999584007924,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 4.303981935418079,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 4.303981935418079,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 482.79995900367936,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"25905fc82ca50bbcaaefec75760c23d64bf63ab3\",\"1cbdeedd51fc97d7a810f101afd1774ef109e4c1\")",
                    "uuid": "dfde2db5ae8b2cfb87b7dbfe70ae39cd892262a4",
                    "_id": "0ed77826-a2b7-4c2e-76bf-5de114992810"
                }, "id": "0ed77826-a2b7-4c2e-76bf-5de114992810"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 714,
                    "volume": 578,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#9c2197227df0459ef5a61180a498b8a9f090dc96([10,0,0])",
                    "uuid": "430fe954639c5b44b3fc676149e80154924dc6eb",
                    "_id": "eb7b530a-f9c3-4588-62fd-5d46ab4fcdbd"
                }, "id": "eb7b530a-f9c3-4588-62fd-5d46ab4fcdbd"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 287.27999999999986,
                    "volume": 13.679999999999836,
                    "numFaces": 10,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#c13e87c6275421183365f469e8a92d132b7eb441([10,0,0])",
                    "uuid": "a37e73830a24a27448097ffb215303d28dca64bc",
                    "_id": "d10ae61e-5004-445b-f932-e38732174f78"
                }, "id": "d10ae61e-5004-445b-f932-e38732174f78"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1125.19282480972,
                    "volume": 420.319964309085,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#f375988a579c2fdc7d3d187a8239aea439be6568([27.5,0,0])",
                    "uuid": "55b37b09a2455abcc6589022e5f8a4e20267dd61",
                    "_id": "11f6e8b5-c5d0-40fa-7d70-c28b19e3f73f"
                }, "id": "11f6e8b5-c5d0-40fa-7d70-c28b19e3f73f"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 981.3078812753079,
                    "volume": 48.63499587022375,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#dfde2db5ae8b2cfb87b7dbfe70ae39cd892262a4([27.5,0,0])",
                    "uuid": "74dc3f8c56563c48db0d42ecdad0b8259d717834",
                    "_id": "9b6dd02a-14f7-46f9-b6ff-3e4f8074e222"
                }, "id": "9b6dd02a-14f7-46f9-b6ff-3e4f8074e222"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 714,
                    "volume": 578,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 289,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 289,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeBox([6,-8.5,-13.9],[8,8.5,3.0999999999999996])",
                    "uuid": "56ed914858438c046aed6bbe47ed93c56023d9a3",
                    "_id": "b605ca9e-903f-4103-3645-9fe653d225c4"
                }, "id": "b605ca9e-903f-4103-3645-9fe653d225c4"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 736.16,
                    "volume": 621.2639999999998,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "back": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeBox([6,-8.6,-14],[8.1,8.6,3.1999999999999997])",
                    "uuid": "b3838dcfcbae3249aa39d1f0cca8b77591536f0c",
                    "_id": "ac0f728e-a705-44db-025d-947e6b972911"
                }, "id": "ac0f728e-a705-44db-025d-947e6b972911"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 872.1599999999999,
                    "volume": 43.263999999999825,
                    "numFaces": 11,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:back:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 6.839999999999918,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 295.84,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 36.11999999999999,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:front": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 289,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:left": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:right": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 34,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"b3838dcfcbae3249aa39d1f0cca8b77591536f0c\",\"56ed914858438c046aed6bbe47ed93c56023d9a3\")",
                    "uuid": "a65fd889d4dc3e5ec2a3a36d5ef44cad74b931c0",
                    "_id": "c21eecc0-1eee-4488-e2e8-54e68e08c442"
                }, "id": "c21eecc0-1eee-4488-e2e8-54e68e08c442"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 4336.654499015351,
                    "volume": 21736.051251657063,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 3105.1501788081514,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,-23.5],[0,0,11.8],14)",
                    "uuid": "f6aba2dce7d87399926b52d25e605d4ce857af81",
                    "_id": "c0e51177-e114-4aa0-16ce-25d75f38bf97"
                }, "id": "c0e51177-e114-4aa0-16ce-25d75f38bf97"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 3788.006757992429,
                    "volume": 17654.8459344904,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2758.5696772641254,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,-22.5],[0,0,11.8],12.8)",
                    "uuid": "c4ccd356d84496e705b8492583b56258a622302d",
                    "_id": "9cb86d64-1e71-44ad-600a-02c0a493b8c8"
                }, "id": "9cb86d64-1e71-44ad-600a-02c0a493b8c8"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 7095.224176279476,
                    "volume": 4081.205317166661,
                    "numFaces": 5,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 3105.1501788081514,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 101.03361973944766,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2758.5696772641254,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"f6aba2dce7d87399926b52d25e605d4ce857af81\",\"c4ccd356d84496e705b8492583b56258a622302d\")",
                    "uuid": "2d33d105b9a9057af0db363c201569a85eb8e451",
                    "_id": "e83342b1-4836-4cdd-5e5d-cfd3b751153b"
                }, "id": "e83342b1-4836-4cdd-5e5d-cfd3b751153b"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 6759.15309239976,
                    "volume": 3840.562292232081,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:1:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2905.5624565775233,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 101.03361973944766,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2557.0255722407082,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 65.06074337432958,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"2d33d105b9a9057af0db363c201569a85eb8e451\",\"2d7f0d0c864b6b014ec13c1ea6a97cf2b46b7a87\")",
                    "uuid": "ae3e826a1b2be3db7b5b162b5bbe19abc0bd5938",
                    "_id": "35070cd6-6939-46cf-f6f8-7b86fa5dc3e5"
                }, "id": "35070cd6-6939-46cf-f6f8-7b86fa5dc3e5"
            }, {
                "shape": {
                    "shapeType": "COMPOUND",
                    "orientation": "FORWARD",
                    "area": 6799.909878041039,
                    "volume": 3791.776250739668,
                    "numFaces": 12,
                    "numSolids": 2,
                    "numShells": 2,
                    "hasMesh": false,
                    "faces": {
                        "m1:m1:1:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2705.9868357218797,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:m1:1:lateral:0:1": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 79.63463126827145,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:m1:1:lateral:0:2": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 79.6348747074577,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 101.03361973944766,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:m2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 65.06074337432958,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:m1:2:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2355.478912725829,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:m1:2:lateral:0:1": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 80.23070231047367,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:m1:2:lateral:0:2": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 80.23138697096509,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m2:undefined:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 57.08073035312252,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"ae3e826a1b2be3db7b5b162b5bbe19abc0bd5938\",\"55b37b09a2455abcc6589022e5f8a4e20267dd61\")",
                    "uuid": "d0f3a5a9e79d274c5f99a3bd305d6775f85914fd",
                    "_id": "79516842-4c1b-46a4-bdb7-763fc2b75294"
                }, "id": "79516842-4c1b-46a4-bdb7-763fc2b75294"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 936.0689470636146,
                    "volume": 2159.8198166017537,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#2d7f0d0c864b6b014ec13c1ea6a97cf2b46b7a87([23.4,0,0])",
                    "uuid": "6b513b031b4776a16333b4d0c87d5f7215a08a60",
                    "_id": "13125d3a-363c-4121-f91b-2a3788305f62"
                }, "id": "13125d3a-363c-4121-f91b-2a3788305f62"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 6423.097552430747,
                    "volume": 3599.968735169032,
                    "numFaces": 7,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:m1:m1:1:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2705.9868357218797,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:1:1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 615.7521601035994,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:m2:undefined:0:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 65.06674040151047,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 101.03361973944766,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:1:m2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 65.06074337432958,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:m1:m1:2:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2355.478912725829,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:1:2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"d0f3a5a9e79d274c5f99a3bd305d6775f85914fd\",\"6b513b031b4776a16333b4d0c87d5f7215a08a60\")",
                    "uuid": "9535da0c7db7242bd64da6600d73b540c1066bff",
                    "_id": "0e132e7d-12c0-44d2-c009-b2c7892fcc04"
                }, "id": "0e132e7d-12c0-44d2-c009-b2c7892fcc04"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 3662.6572111141963,
                    "volume": 16822.68830603693,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2649.2422529192013,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 506.7074790974977,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 506.7074790974977,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,-21.4],[0,0,11.8],12.700000000000001)",
                    "uuid": "65ef4f932cb1f4e94e57a04325f2a1ede44cf5e9",
                    "_id": "ecc24eb6-fedd-423c-b6bd-b700ef3558ad"
                }, "id": "ecc24eb6-fedd-423c-b6bd-b700ef3558ad"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 3617.98376358015,
                    "volume": 16508.931164537607,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2620.4652642123187,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 498.7592496839158,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 498.7592496839158,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,-21.3],[0,0,11.8],12.600000000000001)",
                    "uuid": "0bd38c4f8008c96ebecd41f780dbf144fb24ce4a",
                    "_id": "d9e36d99-77ab-45d3-0090-1cbd024a5abb"
                }, "id": "d9e36d99-77ab-45d3-0090-1cbd024a5abb"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 6283.122475326515,
                    "volume": 313.75714149932264,
                    "numFaces": 5,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2649.2422529192013,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 7.948229413581998,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 506.7074790974977,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2620.4652642123187,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 498.7592496839158,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"65ef4f932cb1f4e94e57a04325f2a1ede44cf5e9\",\"0bd38c4f8008c96ebecd41f780dbf144fb24ce4a\")",
                    "uuid": "1bf7789098bfc969cd4239c6d84ecc625b4ca14d",
                    "_id": "7eb22942-65c0-479e-7baf-0e7efb9fab05"
                }, "id": "7eb22942-65c0-479e-7baf-0e7efb9fab05"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 5884.934257424674,
                    "volume": 293.57062843417316,
                    "numFaces": 6,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:1:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2447.4972991299105,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 7.948229413581998,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 506.7074790974977,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2418.518349915822,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 498.7592496839158,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m2:undefined:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 5.503650183946473,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"1bf7789098bfc969cd4239c6d84ecc625b4ca14d\",\"6b513b031b4776a16333b4d0c87d5f7215a08a60\")",
                    "uuid": "344724b8b411a9c5a861a299b3002020fb778dab",
                    "_id": "813c85b6-c311-4854-5511-99e43d503bf0"
                }, "id": "813c85b6-c311-4854-5511-99e43d503bf0"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 5486.755580495515,
                    "volume": 273.3881422643126,
                    "numFaces": 7,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "m1:m1:1:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2245.7575240921383,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:m2:undefined:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 5.503650183946473,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:1:bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 506.7074790974977,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "1:1:m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 7.948229413581998,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:m1:2:lateral:0:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 2216.576044935971,
                            "numWires": 2,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "1:1:2:bottom": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 498.7592496839158,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m2:lateral:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 5.503403088462967,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"344724b8b411a9c5a861a299b3002020fb778dab\",\"2d7f0d0c864b6b014ec13c1ea6a97cf2b46b7a87\")",
                    "uuid": "91b63a9e45017c772049098e7f7273467671a6cb",
                    "_id": "1aadfea0-41c0-445c-a3e6-fada46a45ad9"
                }, "id": "1aadfea0-41c0-445c-a3e6-fada46a45ad9"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 3096.102391965812,
                    "volume": 7094.218866630326,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 731.3627697557039,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 1182.3698111050542,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 1182.3698111050542,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,11.8],[0,0,17.8],19.4)",
                    "uuid": "330d9ea9d8f4a7edcea2abb017cff108e576980a",
                    "_id": "76575498-755d-496d-82a9-4a67eea06eaf"
                }, "id": "76575498-755d-496d-82a9-4a67eea06eaf"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1531.9034097434553,
                    "volume": 3136.7546009032644,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 486.3185427757,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 522.7924334838776,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 522.7924334838776,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,11.8],[0,0,17.8],12.9)",
                    "uuid": "2eff9964df7d728d5c3c7cc0932220de2c736cc0",
                    "_id": "b71d98b9-6010-4c62-4485-ad9f53b2508d"
                }, "id": "b71d98b9-6010-4c62-4485-ad9f53b2508d"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1511.9857123196957,
                    "volume": 3088.3112421849105,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 482.5486315913922,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 514.7185403641517,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,11.8],[0,0,17.8],12.8)",
                    "uuid": "9bd36c7b1decf9efd373bf283f826aec952b5402",
                    "_id": "1b843d7b-cd7e-4e13-d11d-7f877c6518f8"
                }, "id": "1b843d7b-cd7e-4e13-d11d-7f877c6518f8"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 2536.836067773757,
                    "volume": 3957.464265727061,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 731.3627697557039,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 659.5773776211767,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 659.5773776211767,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 486.3185427757,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"330d9ea9d8f4a7edcea2abb017cff108e576980a\",\"2eff9964df7d728d5c3c7cc0932220de2c736cc0\")",
                    "uuid": "4b731770ebf7c22b302d57c6f95a678d89e9bb08",
                    "_id": "31c7b864-fe48-4e7d-16c5-026775743ce1"
                }, "id": "31c7b864-fe48-4e7d-16c5-026775743ce1"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 985.014960606544,
                    "volume": 48.44335871835392,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 486.3185427757,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 8.07389311972588,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 8.07389311972588,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 482.5486315913922,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"2eff9964df7d728d5c3c7cc0932220de2c736cc0\",\"9bd36c7b1decf9efd373bf283f826aec952b5402\")",
                    "uuid": "b26cba85d018074059bc7e66ad89e8d7d459a965",
                    "_id": "67d03e45-64b5-40a6-dc99-6ade085c3f37"
                }, "id": "67d03e45-64b5-40a6-dc99-6ade085c3f37"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 3257.203263241898,
                    "volume": 14114.547474048222,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2352.424579008037,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 452.3893421169303,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 452.3893421169303,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,17.8],[0,0,49],12)",
                    "uuid": "67743e91a42b3528e0c11457fea45401c327cdcb",
                    "_id": "783a1cf2-8d35-40bc-b8f0-5a22e572d3ee"
                }, "id": "783a1cf2-8d35-40bc-b8f0-5a22e572d3ee"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 2916.6546195927635,
                    "volume": 11860.140585832187,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2156.3891974240337,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 380.132711084365,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 380.132711084365,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,17.8],[0,0,49],11)",
                    "uuid": "caf399fc97d7ee24f51c24fda1533991b6980538",
                    "_id": "6ebe92f1-8cd3-465f-59cc-ed7d2fb531da"
                }, "id": "6ebe92f1-8cd3-465f-59cc-ed7d2fb531da"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 2883.290905611641,
                    "volume": 11645.481842997702,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2136.785659265634,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 373.2526231730033,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 373.2526231730033,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,17.8],[0,0,49],10.9)",
                    "uuid": "ea8e45eb23574a6c96091140eae1ed7de63e0715",
                    "_id": "3e2685c9-ad7d-472a-8e39-6ebd2f092592"
                }, "id": "3e2685c9-ad7d-472a-8e39-6ebd2f092592"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 4653.327038497202,
                    "volume": 2254.4068882160364,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2352.424579008037,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 72.25663103256534,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 72.25663103256534,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2156.3891974240337,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"67743e91a42b3528e0c11457fea45401c327cdcb\",\"caf399fc97d7ee24f51c24fda1533991b6980538\")",
                    "uuid": "d2e36cd8959e93d4545f7896b4098b34b70f74a7",
                    "_id": "596bc4cc-8830-4525-85f8-e55370a3e135"
                }, "id": "596bc4cc-8830-4525-85f8-e55370a3e135"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 4306.9350325123905,
                    "volume": 214.65874283448284,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2156.3891974240337,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 6.880087911361613,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 6.880087911361613,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 2136.785659265634,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"caf399fc97d7ee24f51c24fda1533991b6980538\",\"ea8e45eb23574a6c96091140eae1ed7de63e0715\")",
                    "uuid": "912c775db37cdc969554d3c4a8be542411e59682",
                    "_id": "9de8a2f2-adc6-42df-ef2d-ebabf66dc866"
                }, "id": "9de8a2f2-adc6-42df-ef2d-ebabf66dc866"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 530.0495125136699,
                    "volume": 688.1344548423083,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 185.98228509251572,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 172.0336137105771,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 172.0336137105771,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([17,0,28],[21,0,28],7.4)",
                    "uuid": "cea266d16a3200c95b6b7605ffef9fe94ce0e436",
                    "_id": "b15a0dd8-f28a-49de-366f-8b69e76511c6"
                }, "id": "b15a0dd8-f28a-49de-366f-8b69e76511c6"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1055.5751316061708,
                    "volume": 904.7786842338603,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 150.79644737231007,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 452.3893421169303,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 452.3893421169303,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,49],[0,0,51],12)",
                    "uuid": "18c9f0ac17a02aa1fcb7bb2b8323cae738fc56ab",
                    "_id": "ca2a3f88-e116-49ec-18f4-28b1509dd67f"
                }, "id": "ca2a3f88-e116-49ec-18f4-28b1509dd67f"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 301.5928947446202,
                    "volume": 226.19467105846508,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 75.39822368615503,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 113.09733552923258,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 113.09733552923258,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([0,0,49],[0,0,51],6)",
                    "uuid": "990cbe0eefa29a269cbdd9964168e1935c58018f",
                    "_id": "9bca119c-fa90-4570-5802-b400d80f6357"
                }, "id": "9bca119c-fa90-4570-5802-b400d80f6357"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 904.7786842338608,
                    "volume": 678.5840131753953,
                    "numFaces": 4,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "1:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 150.79644737231007,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "m1:top:0": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 339.2920065876978,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "m1:bottom:0": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 339.2920065876978,
                            "numWires": 2,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "2:lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 75.39822368615503,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        }
                    },
                    "cmd": "cut(\"18c9f0ac17a02aa1fcb7bb2b8323cae738fc56ab\",\"990cbe0eefa29a269cbdd9964168e1935c58018f\")",
                    "uuid": "60bd651486937f83fc43e3bccc0e916a6d5314bf",
                    "_id": "2bed9491-fbd5-420e-b0b9-64b1ffc31b38"
                }, "id": "2bed9491-fbd5-420e-b0b9-64b1ffc31b38"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1445.3839480635918,
                    "volume": 1266.9414853396918,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {
                        "lateral": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 178.44246272390023,
                            "numWires": 1,
                            "isPlanar": false,
                            "hasMesh": false
                        },
                        "top": {
                            "shapeType": "FACE",
                            "orientation": "FORWARD",
                            "area": 633.4707426698458,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        },
                        "bottom": {
                            "shapeType": "FACE",
                            "orientation": "REVERSED",
                            "area": 633.4707426698458,
                            "numWires": 1,
                            "isPlanar": true,
                            "hasMesh": false
                        }
                    },
                    "cmd": "makeCylinder([-19.4,0,-5.4],[-21.4,0,-5.4],14.2)",
                    "uuid": "5ccae5e8e8313c525d2219657c7b544f3f0738db",
                    "_id": "97e1c846-b68a-4dd6-df1e-6fa07f32291e"
                }, "id": "97e1c846-b68a-4dd6-df1e-6fa07f32291e"
            }, {
                "shape": {
                    "shapeType": "SOLID",
                    "orientation": "FORWARD",
                    "area": 1445.383948063592,
                    "volume": 1266.941485339692,
                    "numFaces": 3,
                    "numSolids": 1,
                    "numShells": 1,
                    "hasMesh": false,
                    "faces": {},
                    "cmd": "translate#5ccae5e8e8313c525d2219657c7b544f3f0738db([40.8,0,0])",
                    "uuid": "64529809deab4d0467ec23581095b1c31baacae5",
                    "_id": "b60261ba-e91d-4f04-5260-32a9190718d4"
                }, "id": "b60261ba-e91d-4f04-5260-32a9190718d4"
            }];
        });

        it("should not give any error or segmentation fault", function (done) {


            let space = occ.makeBox([-10000, -10000, -10000], [10000, 10000, 10000]);
            let solids = [];

            let s;

            // carve the box by removing the object the scene
            for (s in data) {

                const solidObject = data[s].shape;
                // const solid = new occ.Solid(solidObject);

                if (solidObject.cmd.indexOf("makeCylinder") !== -1) {
                    const matches = solidObject.cmd.match(/makeCylinder\(\[(.*),(.*),(.*)\],\[(.*),(.*),(.*)\],(.*)\)/);
                    const values = matches.map(u => parseFloat(u));
                    const solid = new occ.makeCylinder(
                        [values[1], values[2], values[3]],
                        [values[4], values[5], values[6]],
                        values[7]
                    );
                    solids.push(solid);
                }
                if (solidObject.cmd.indexOf("makeBox") !== -1) {
                    const matches = solidObject.cmd.match(/makeBox\(\[(.*),(.*),(.*)\],\[(.*),(.*),(.*)\]\)/);
                    const values = matches.map(u => parseFloat(u));
                    const solid = new occ.makeBox(
                        [values[1], values[2], values[3]],
                        [values[4], values[5], values[6]]
                    );
                    solids.push(solid);
                }
                if (solidObject.cmd.indexOf("cut") !== -1) {
                    const matches = solidObject.cmd.match(/cut\(\"(.*)\",\"(.*)\"\)/);


                    let  index = null;
                    data.find(function (u, idx) {
                        if (u.shape.uuid == matches[1]) {
                            index = idx
                        }
                    });

                    let index2 =  null;
                    data.find(function (u, idx) {
                        if (u.shape.uuid == matches[2]) {
                            index2 = idx;
                        }
                    });
                    const solid = new occ.cut(solids[index], solids[index2]);
                    solids.push(solid);
                }
                if (solidObject.cmd.indexOf("translate") !== -1) {

                    const matches = solidObject.cmd.match(/translate#(.*)\(\[(.*),(.*),(.*)\]\)/);
                    const values = matches.map(u => parseFloat(u));
                    let trsf = new occ.Transformation();
                    trsf.makeTranslation([values[2], values[3], values[4]]);

                    let index = null;
                    data.find(function (u, idx) {
                        if (u.shape.uuid == matches[1]) {
                            index = idx;
                        }
                    });
                    const solid = solids[index].applyTransform(trsf);
                    solids.push(solid);
                }

                space = occ.cut(space, solids[s]);
            }
            done();

        });
    });
});



