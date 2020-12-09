
const { exec }= require("child_process");


if (process.platform === "linux") {

    const cmd = "export vOCC=$(export VERSION_FILE=/usr/include/opencascade/Standard_Version.hxx && grep -i \"#define OCC_VERSION_COMPLETE\" $VERSION_FILE | awk '{gsub(/\"/, \"\", $0); print $3}') && (cd lib/binding && echo 'linux libs directory' && pwd && ls * && echo $vOCC && ls *.so.$vOCC | sed sP^libPPg | sed sp.so.$vOCCpp | xargs -i ln -sf lib{}.so.$vOCC lib{}.so.7)";

    exec(cmd, (error, stdout, stderr)  => {

        console.log(`stdout: ${stdout}`);
        if (error) {
            console.log(error.code);
        } else {
            console.log("done post install rename libs");
        }
    });

}
