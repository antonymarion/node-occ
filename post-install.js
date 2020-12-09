
const { exec }= require("child_process");


if (process.platform === "linux") {

    const cmd = "export VERSION_FILE=/usr/include/opencascade/Standard_Version.hxx && (cd lib/binding && echo 'linux libs directory' && pwd && ls * && echo $VERSION_FILE && ls *.so.$VERSION_FILE | sed sP^libPPg | sed sp.so.$VERSION_FILEpp | xargs -i ln -sf lib{}.so.$VERSION_FILE lib{}.so.7)";

    exec(cmd, (error, stdout, stderr)  => {

        console.log(`stdout: ${stdout}`);
        if (error) {
            console.log(error.code);
        } else {
            console.log("done");
        }
    });

}
