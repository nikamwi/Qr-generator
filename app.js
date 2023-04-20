const qrText = document.getElementById("qrtext");
const qrImage = document.getElementById("qrimage");
const download = document.getElementById("download");
const dark = document.getElementById("dark");
const light = document.getElementById("light");
const sizes = document.getElementById("sizes");

qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);

const defaultUrl = "https://www.facebook.com/profile.php?id=100009294577998";

let colorLight = "#ffffff",
    colorDark = "#000000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
};

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
};

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode()
};

async function generateQRCode() {
    qrImage.innerHTML = "";
    new QRCode("qrimage", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await downloadQRImage();
};

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

function downloadQRImage() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qrimage img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();