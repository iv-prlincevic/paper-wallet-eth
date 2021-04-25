import { ethers } from "ethers";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import ls from "local-storage";
import { useRef } from "react";

export default function Wallet() {
  const [publicAddress, setPublicAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const componentRef = useRef();

  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setPublicAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    ls.set("publicAddress", wallet.address);
  };

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Button variant="primary" onClick={createWallet}>
          {" "}
          Create a Wallet
        </Button>
      </div>
      <div
        ref={componentRef}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          className="text-center"
          style={{
            margin: "20px",
            backgroundImage:
              "url('./images/—Pngtree—background of molandis hand-painted graffiti_990601.png') ",
            backgroundSize: "cover",
          }}
        >
          <Card.Body>
            <div
              style={{
                backgroundColor: "#fff",
                margin: "20px",
                padding: "20px 10px",
              }}
            >
              <Card.Title style={{ fontSize: "30px" }}>
                Your ETH Wallet
              </Card.Title>
              <div style={{ margin: "30px", padding: "20px" }}>
                <QRCode value={publicAddress} id="canvas" />

                <div style={{ fontSize: "18px", margin: "10px" }}>
                  <div>Public Address:</div> {publicAddress}
                </div>
              </div>
              <div style={{ margin: "30px", padding: "20px" }}>
                <QRCode value={privateKey} id="canvas" />
                <div style={{ fontSize: "18px", margin: "10px" }}>
                  <div>Private key:</div> {privateKey}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div>
        <ReactToPrint
          trigger={() => <Button variant="primary">Print wallet</Button>}
          content={() => componentRef.current}
        />
      </div>
    </>
  );
}
