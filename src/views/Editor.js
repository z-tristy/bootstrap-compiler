
import { Form, TextField } from "@shopify/polaris"
import { useCallback, useEffect, useState } from "react"
import { setBootstrapVariables } from './data'

function Editor(props) {

  const [socket, setSocket] = useState(null)

  const [variables, setVariables] = useState(setBootstrapVariables())

  useEffect(() => {
    let ws = null
    if (window.location.href.indexOf(".vercel.app") > -1) {
      ws = new WebSocket("wss://nodejs-production-89c8.up.railway.app/")
    } else {
      ws = new WebSocket("ws://192.168.11.121:3000/")
    }
    // const ws = new WebSocket("ws://192.168.11.121:3000/");
    // const ws = new WebSocket("wss://nodejs-production-89c8.up.railway.app/")
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

  function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const updateData = useCallback(
    () => {
      if (!socket) return;
      const variablesString = stringifyVariables()
      const customData = `$primary: ${generateRandomColor()};$spacers: (0: 0,1: 0.25rem,2: 0.75rem,3: 2rem,4: 1.5rem,5: 2rem,6: 3rem,7: 4rem,8: 5rem,9: 9rem,);`
      console.log(variablesString)
      console.log('mapsString')
      socket.send(JSON.stringify({ 
        general: variablesString.general,
        utilities: variablesString.utilities,
        // general: customData
      }));
    },
    [variables, socket],
  );

  const stringifyVariables = () => {
    let catchString = {
      general: '',
      utilities: '',
    }
    let valueWithUnit = ''
    console.log(variables)
    for (let key in variables) {
      // if () 判断值不为空
      const data = variables[key].data
      const variablesType = variables[key].variablesType
      if (typeof data === 'object' && !Array.isArray(data)) {
        if (variablesType === 'maps') {
          catchString.general += `$${key}: (`
          for (let k in data) {
            valueWithUnit = `${data[k]}${ variables[key].unit || ''}`
            catchString.general += `${k}: ${data[k] == 0 ? 0 : valueWithUnit},`
          }
          catchString.general += ');'
        } else if (variablesType === 'utilities') {
          console.log(123)
          catchString.utilities += `$utilities: map-merge($utilities, (`
          catchString.utilities += `"${key}": (`
          catchString.utilities += `${variables[key].extraProperty},`
          catchString.utilities += `values: (`
          for (let k in data) {
            valueWithUnit = `${data[k]}${ variables[key].unit || ''}`
            catchString.utilities += `${k}: ${data[k] == 0 ? 0 : valueWithUnit},`
          }
          catchString.utilities += `))));`
        } else {
          for (let k in data) {
            valueWithUnit = `${data[k]}${ variables[key].unit || ''}`
            catchString.general += `$${k}: ${data[k] == 0 ? 0 : valueWithUnit};`
          }
        }
      }
      
    }
    return catchString
  }

  /**
   * @param value 输入框修改的值
   * @param key 参数类型, eg: color
   * @param name 参数某类型下面的 key 名字
  */
  const handleVariablesUpdate = (value, name, key) => {
    let catchs = variables[key]
    let catchData = catchs.data

    let convertValue = catchs.unit === 'rem' ? value / 16 : value

    catchData = {...catchData, [name]: convertValue}
    catchs = {...catchs, data: catchData}
    setVariables({...variables, [key]: catchs})
  }


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <a href={`https://fastlane-sections.myshopify.com/admin/oauth/authorize?client_id=b523ef94f70673c1ce904310d923918d&scope=write_products,write_customers,write_draft_orders&redirect_uri=http://192.168.8.55:3010&state=${new Date().getTime()}`}>New Code Link</a> */}
      <div style={{ width: "500px", margin: "0px auto" }}>
        <Form
          onSubmit={updateData}
        >
          {
            Object.keys(variables).map(key =>
              <div key={key}>
                <br />
                <br />
                <h3>{variables[key].title}</h3>
                <div>{variables[key].info}</div>
                {
                  Object.keys(variables[key].data)?.map(k =>
                    <div key={k}>
                      <br />
                      <TextField
                        value = {
                          variables[key].unit === 'rem' ? 
                          String(variables[key].data[k] * 16) : 
                          String(variables[key].data[k])
                        }
                        type = { variables[key].inputType }
                        name={variables[key].data[k]}
                        label={k}
                        onChange={ e => handleVariablesUpdate(e, k, key) }
                      />
                    </div>
                  )
                }
              </div>
            )
          }
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

