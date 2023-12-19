import firebase from "firebase";
import fs from "fs";
import path from "path";
import Cert from "../../components/cert";
import GDSCCoreTeamCertification2021 from "../../components/cert/GDSCCoreTeamCertification2021";
import ReactDOMServer from "react-dom/server";
const sharp = require("sharp");
import Head from "next/head";

export default function C(props) {
  return (
    <>
      <Head>
        <title>{`${props.name} - GDSC Certificate`}</title>
        <meta name="title" content={`${props.name} - GDSC Certificate`} />
        <meta
          name="description"
          content={`Google Develelopers Student Clubs Certificate`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://gdsc23-cert.web.app/c/${props.id}`}
        />
        <meta
          property="og:title"
          content={`${props.name} - GDSC Certificate`}
        />
        <meta
          property="og:description"
          content={`${props.name} - Google Develelopers Student Clubs Certificate`}
        />
        <meta
          property="og:image"
          content={`https://gdsc23-cert.web.app/c/${props.id}.jpeg`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://gdsc23-cert.web.app/c/${props.id}`}
        />
        <meta
          property="twitter:title"
          content={`${props.name} - GDSC Certificate`}
        />
        <meta
          property="twitter:description"
          content={`${props.name} - Google Develelopers Student Clubs Certificate`}
        />
        <meta
          property="twitter:image"
          content={`https://gdsc23-cert.web.app/c/${props.id}.jpeg`}
        />
      </Head>

      <Cert {...props}></Cert>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const { data } = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  const info = data.find((d) => d.id === id);

  if (fs.existsSync(`${path.resolve("public/c/", id)}.jpeg`)) {
    return { props: info };
  }

  const roundedCorners = Buffer.from(
    ReactDOMServer.renderToStaticMarkup(
      <GDSCCoreTeamCertification2021 {...info} />
    )
  );
  sharp(roundedCorners)
    .jpeg({ quality: 50 })
    .toFile(`${path.resolve("public/c/", id)}.jpeg`)
    .catch(function (err) {
      console.log(err);
    });
  return { props: info };
}

export async function getStaticPaths() {
  var dir = "public/c/";

  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }

  let data = [];
  const paths = [];

  let lastCreated = 0;
  if (fs.existsSync(path.resolve("data.json"))) {
    const { lastCreated: oldLastCreated, data: oldData } = JSON.parse(
      fs.readFileSync(path.resolve("data.json"))
    );
    lastCreated = oldLastCreated;
    data = oldData;
  }
  const db = firebase.firestore();
  let docRef = db.collectionGroup("core21").orderBy("created");
  if (lastCreated !== 0) {
    const firestoreLastCreated = firebase.firestore.Timestamp.fromDate(
      new Date(lastCreated)
    );
    docRef = docRef.startAfter(firestoreLastCreated);
  } else {
    console.log("WARN  -  Getting all Data");
  }
  const querySnapshot = await docRef.get();
  console.log("info  - Getting all " + querySnapshot.docs.length + " Docs");
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({ id: doc.id, ...docData });
    let created = docData.created.toDate().getTime();
    if (created > lastCreated) {
      lastCreated = created;
    }
  });
  fs.writeFileSync(
    path.resolve("data.json"),
    JSON.stringify({ lastCreated, data })
  );
  data.forEach((doc) => {
    paths.push({ params: { id: doc.id } });
  });
  if (paths.length === 0) {
    throw "empty list";
  }
  return {
    paths,
    fallback: false,
  };
}
