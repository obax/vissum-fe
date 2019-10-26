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

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig)
}

const IndexPage = () => {
  const [collectionFiles, setCollectionFiles] = React.useState({})

  const query = firebase.apps[0]
    .firestore()
    .collection("visumm-task-status")
    .orderBy("created", "desc")
    .limit(20)

  React.useEffect(() => {
    query.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(({ doc, type }) => {
        let collectionFilesCopy = collectionFiles
        switch (type) {
          case "removed":
            delete collectionFilesCopy[doc.id]
            setCollectionFiles(collectionFilesCopy)
            break
          default:
            collectionFilesCopy[doc.id] = doc.data()
        }
        setCollectionFiles(collectionFilesCopy)
      })
    })
  }, [])

  return (
    <Layout>
      <Logo
        className={css`
          width: 150px;
        `}
      />
      <SEO title="Welcome to Vissum, the Youtube video summarizer " />
      <h1
        className={css`
          color: #d6deeb;
        `}
      >
        The Youtube video summarizer
      </h1>
      <p>Start by entering a Youtube url below </p>
      <RequestForm />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(collectionFiles).map((key, index) => (
            <tr
              key={key}
              className={css`
                background-color: #da9696;
                & td {
                  padding: 15px;
                }
                color: black;
                font-family: "Courier New", Courier, "Lucida Sans Typewriter",
                  "Lucida Typewriter", monospace;
              `}
            >
              <td>{collectionFiles[key].title}</td>
              <td>{collectionFiles[key].state}</td>
              <td></td>
              <td>{Date(collectionFiles[key].created.seconds * 1000)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default IndexPage
