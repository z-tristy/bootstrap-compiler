/*
 * @Author: lijunwei
 * @Date: 2022-01-07 15:10:15
 * @LastEditTime: 2022-01-10 16:49:08
 * @LastEditors: lijunwei
 * @Description: 
 */

import { Button, ButtonGroup, TextField } from "@shopify/polaris";
// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { io } from "socket.io-client";



function Editor(props) {

  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("green");
  useEffect(() => {

    // axios.get("http://192.168.8.55:8001/bootit")
    //   .then(res => {
    //     console.dir(res);
    //   })


    const ws = new WebSocket("ws://192.168.8.55:8001");

    ws.onopen = (e)=>{
      console.log("socket opened");
    }
  
    ws.onmessage = (e)=>{
      console.log(e.data);
    }

    setSocket(ws);

  }, [])

  const ioChangeColor = useCallback(
    () => {
      if (!socket) return;
      socket.send(JSON.stringify({colorChange: color}));
    },
    [color, socket],
  );


  return (
    <div style={{ width: "300px", margin: "0px auto",padding: "300px 0" }}>

        <TextField 
          value={ color }
          onChange={ val=>setColor(val) }
        />
        <br></br>

        <Button
          fullWidth
          primary
          onClick={ ioChangeColor }
        >Submit</Button>
        
    </div>
  );
}
export { Editor }

