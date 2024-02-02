import path from 'path';
import fs from 'fs';
import sharp from "sharp";
import ReactDOMServer from "react-dom/server";
import CertificateTemplate1 from "../../components/cert/CertificateTemplate1";
import db from "../../firebase-config";

export default async (req, res) => {
    const { id } = req.query;
    let data = null;

    // Load the image, encode it, and embed it in the SVG.
    const bgImagePath = path.join(process.cwd(), 'public', 'blank_certificate.png');
    const bgImageBuffer = fs.readFileSync(bgImagePath);

    // Encode the image buffer to base64.
    const base64BGImage = bgImageBuffer.toString('base64');

    // Query Firebase using the provided id.
    if (id) {
        await db
            .collection("cert")
            .doc(
                id.split("-").length > 1
                    ? id.split("-")[0]
                    : id.startsWith("omarffhj")
                    ? "omarffhj"
                    : id.startsWith("asd")
                    ? "asd"
                    : ""
            )
            .collection("core21")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    data = doc.data();
                } else {
                    return res.status(404).send("No document found.");
                }
            })
            .catch((error) => {
                return res.status(404).send("Error getting document:", error);
            });
    } else {
        return res.status(404).send("No id provided.");
    }

    // Use ReactDOMServer to render the JSX component to a string.
    const svgContent = ReactDOMServer.renderToString(
        <CertificateTemplate1
            {...data}
            id={id}
            host={req.headers.host}
            background_image={`data:image/png;base64,${base64BGImage}`}
        />
    );

    // Convert the SVG to an image.
    const imageBuffer = await convertSVGToImage(svgContent);

    // Send the image in the API response.
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
};

// Helper function to convert SVG to image using sharp.
const convertSVGToImage = async (svgContent) => {
    // Create a buffer from the SVG content.
    const svgBuffer = Buffer.from(svgContent);

    // Use sharp to convert the SVG buffer to a PNG buffer.
    const pngBuffer = await sharp(svgBuffer).png().toBuffer();

    return pngBuffer;
};
