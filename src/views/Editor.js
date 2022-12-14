/*
 * @Author: lijunwei
 * @Date: 2022-01-07 15:10:15
 * @LastEditTime: 2022-01-17 20:02:11
 * @LastEditors: lijunwei
 * @Description: 
 */

import { Form, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

function Editor(props) {

  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("");

  // const ws = new WebSocket("wss://staging-preview.vercel.app");
  // ws.onopen = (e) => {
  //   console.log("socket opened");
  // }

  // ws.onmessage = (e) => {
  //   console.log(e.data);
  // }

  // setSocket(ws);
  // console.log(ws)
  // setInterval(function(){
  //   console.log(ws.readyState)  
  // }, 2000)
  useEffect(() => {
    // console.log(ws)
    // const ws = new WebSocket("ws://192.168.10.3:8002/");
    const ws = new WebSocket("wss://staging-preview.vercel.app");
    ws.onopen = (e) => {
      console.log("socket opened");
    }

    ws.onmessage = (e) => {
      console.log(e.data);
    }

    setSocket(ws);
    console.log(ws)
    console.log(ws.readyState)
  }, [])

  const ioChangeColor = useCallback(
    () => {
      if (!socket) return;
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
            label="Input a color and press ENTER. e.g. #333, red"
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
        true && 
        <iframe
          title="server"
          style={{ border: "none" }}
          height="100%"
          width="100%" 
          // src={`http://192.168.10.3:8002/`}
          src={`https://staging-preview.vercel.app`}
        />
      }
      </div>

    </div>
  );
}
export { Editor }

