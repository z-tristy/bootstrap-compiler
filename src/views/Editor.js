
import { Form, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

function Editor(props) {

  const [socket, setSocket] = useState(null);
  const [general, setGeneral] = useState({
    primary: '#F20000',
    secondary: '#747475',
    inverse: '#F7F7F7',
    white: '#ffffff',
    black: '#000000'
  });

  useEffect(() => {
    // const ws = new WebSocket("ws://192.168.11.113:3000/");
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

  const updateData = useCallback(
    () => {
      if (!socket) return;
      const generalString = stringifyGeneral()
      console.log(generalString)
      console.log('generalString')
      socket.send(JSON.stringify({ 
        general: generalString
      }));
    },
    [general, socket],
  );

  const stringifyGeneral = () => {
    let string = ''
    console.log(general)
    for (let key in general) {
      // if () 判断值不为空
      string += `$${key}: ${general[key]};`
    }
    return string
  }

  const handleGeneralUpdate = (value, name) => {
    setGeneral({...general, [name]: value})
    console.log(general)
  }


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <a href={`https://fastlane-sections.myshopify.com/admin/oauth/authorize?client_id=b523ef94f70673c1ce904310d923918d&scope=write_products,write_customers,write_draft_orders&redirect_uri=http://192.168.8.55:3010&state=${new Date().getTime()}`}>New Code Link</a> */}
      <div style={{ width: "300px", margin: "0px auto" }}>
        <Form

          onSubmit={updateData}
        >
          <br />
          <TextField
            value={general.primary}
            name='primary'
            label="Primary"
            onChange={ e => handleGeneralUpdate(e, 'primary') }
          />
          <br />
          <TextField
            value={general.secondary}
            name="secondary"
            label="Secondary"
            onChange={ e => handleGeneralUpdate(e, 'secondary') }
          />
          <br />
          <TextField
            value={general.inverse}
            name="inverse"
            label="inverse"
            onChange={ e => handleGeneralUpdate(e, 'inverse') }
          />
          <br />
          <TextField
            value={general.white}
            name="white"
            label="white"
            onChange={ e => handleGeneralUpdate(e, 'white') }
          />
          <br />
          <TextField
            value={general.black}
            name="black"
            label="black"
            onChange={ e => handleGeneralUpdate(e, 'black') }
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

