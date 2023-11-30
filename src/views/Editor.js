
import { Form, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

function Editor(props) {

  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://nodejs-production-89c8.up.railway.app/");
    console.log(ws)
    ws.onopen = (e) => {
      console.log("socket opened");
    }

    ws.onmessage = (e) => {
      console.log(e.data);
      console.log('客户端 接受 message');
    }

    setSocket(ws);
  }, [])

  const ioChangeColor = useCallback(
    () => {
      if (!socket) return;
      console.log(2)
      socket.send(JSON.stringify({ colorChange: color }));
    },
    [color, socket],
  );


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <a href={`https://fastlane-sections.myshopify.com/admin/oauth/authorize?client_id=b523ef94f70673c1ce904310d923918d&scope=write_products,write_customers,write_draft_orders&redirect_uri=http://192.168.8.55:3010&state=${new Date().getTime()}`}>New Code Link</a> */}
      <div style={{ width: "300px", margin: "0px auto" }}>
        <Form

          onSubmit={ioChangeColor}
        >
          <br />
          <TextField
            value={color}
            label="Primary"
            onChange={val => setColor(val)}
          />

          {/* <Button
          fullWidth
          primary
          onClick={ ioChangeColor }
        >Submit</Button> */}
        </Form>
      </div>

      <div style={{ flex: 1, position: "relative", padding: "20px" }}>
      {
        false && 
        <iframe
          title="server"
          style={{ border: "none" }}
          height="100%"
          width="100%"
          src={`https://nodejs-production-89c8.up.railway.app/`}
        />
      }
      </div>

    </div>
  );
}
export { Editor }

