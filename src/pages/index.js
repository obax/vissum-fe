import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RequestForm from "../components/request-input"
import { css } from "emotion"
import Img from "gatsby-image"
import TVImage from "../images/aleks-dorohovich-unsplash.jpg"
import Logo from "../images/logo.inline.svg"
import FirebaseConfig from "../config/firebase.json"
import * as firebase from "firebase"

const IndexPage = () => {
  const [collectionFiles, setCollectionFiles] = React.useState({})
  firebase.initializeApp(FirebaseConfig)

  const query = firebase
    .firestore()
    .collection("visumm-task-status")
    .orderBy("created", "desc")
    .limit(20)

  query.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(({ doc, type }) => {
      switch (type) {
        case "removed":
          var tmpCol = collectionFiles
          delete tmpCol[doc.id]
          setCollectionFiles(tmpCol)
          break
        default:
          var tmpCol = collectionFiles
          tmpCol[doc.id] = doc.data()
          setCollectionFiles(tmpCol)
      }
    })
  })

  return (
    <Layout>
      <Logo
        className={css`
          width: 150px;
        `}
      />
      <SEO title="Welcome to Vissum, the Youtube video summarizer" />
      <h1>Welcome to Vissum</h1>
      <h2
        className={css`
          color: #d6deeb;
        `}
      >
        The Youtube video summarizer
      </h2>
      <RequestForm />
      <table>
        <th>
          <td>Title</td>
          <td>Status</td>
          <td>Progress</td>
        </th>
        {collectionFiles.map((file, index) => (
          <tr key={index}>
            <td>{JSON.stringify(file)}</td>
          </tr>
        ))}
      </table>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
