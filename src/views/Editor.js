
import { Form, TextField, Page, Badge } from "@shopify/polaris"
import { useCallback, useEffect, useState } from "react"

function Editor(props) {

  const [socket, setSocket] = useState(null)
  const [general, setGeneral] = useState({
    primary: '#F20000',
    secondary: '#747475',
    inverse: '#F7F7F7',
    white: '#ffffff',
    black: '#000000'
  })

  const [maps, setMaps] = useState({
    spacers: {
      unit: 'rem',
      data: {
        0: 0,
        1: .25, // 4
        2: .5, // 8
        3: 1, //16
        4: 1.5, //24
        5: 2, //32
        6: 3, //48
        7: 4, //64
        8: 5, //80
        9: 6, //96
      }
    },
    'grid-breakpoints': {
      unit: 'px',
      data: {
        xs: 0,
        sm: 576,  // 576px
        md: 768,  // 768px
        lg: 1152, // 1152px
        xl: 1280, // 1280px
        xxl: 1440 // 1440px
      }
    }
  })

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
      const mapsString = stringifyMaps()
      console.log(mapsString)
      console.log('mapsString')
      socket.send(JSON.stringify({ 
        general: `${generalString}${mapsString}`
      }));
    },
    [general, maps, socket],
  );

  const stringifyGeneral = () => {
    let catchString = ''
    console.log(general)
    for (let key in general) {
      // if () 判断值不为空
      catchString += `$${key}: ${general[key]};`
    }
    return catchString
  }

  const stringifyMaps = () => {
    let catchString = ''
    console.log(maps)
    for (let key in maps) {
      // if () 判断值不为空
      catchString += `$${key}: (`
      const data = maps[key].data
      if (typeof data === 'object' && !Array.isArray(data)) {
        for (let k in data) {
          catchString += `${k}: ${data[k]}${maps[key].unit},`
        }
      }
      catchString += ');'
      console.log(catchString)
    }
    return catchString
  }

  const handleGeneralUpdate = (value, name) => {
    setGeneral({...general, [name]: value})
    console.log(general)
  }

  /**
   * @param value 输入框修改的值
   * @param key 参数类型, eg: spacers
   * @param name 参数某类型下面的 key 名字
  */
  const handleMapsUpdate = (value, name, key) => {
    console.log(name)
    let catchs = maps[key]
    let catchData = catchs.data

    let convertValue = value / (catchs.unit === 'rem' ? 16 : 1)

    catchData = {...catchData, [name]: convertValue}
    catchs = {...catchs, data: catchData}
    console.log(catchs)
    console.log(catchData)
    setMaps({...maps, [key]: catchs})
  }


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <a href={`https://fastlane-sections.myshopify.com/admin/oauth/authorize?client_id=b523ef94f70673c1ce904310d923918d&scope=write_products,write_customers,write_draft_orders&redirect_uri=http://192.168.8.55:3010&state=${new Date().getTime()}`}>New Code Link</a> */}
      <div style={{ width: "500px", margin: "0px auto" }}>
        <Form
          onSubmit={updateData}
        >
          {
            Object.keys(general).map(key =>
              <div key={key}>
                <br />

                <TextField
                  value={general[key]}
                  name={key}
                  label={key}
                  onChange={ e => handleGeneralUpdate(e, key) }
                />
              </div>
            )
          }
          {
            Object.keys(maps).map(key =>
              <div key={key}>
                <br />
                <br />
                <h3>{key}</h3>

                {
                  Object.keys(maps[key].data).map(k =>
                    <div key={k}>
                      <br />
                      <TextField
                        value={String(maps[key].data[k] * (maps[key].unit === 'rem' ? 16 : 1))}
                        type="number"
                        name={maps[key].data[k]}
                        label={k}
                        onChange={ e => handleMapsUpdate(e, k, key) }
                      />
                    </div>
                  )
                }
              </div>
            )
          }

          {/* <br />
          <br />
          <h3>Grid-breakpoints</h3>
          {
            Object.keys(maps['grid-breakpoints']).map(key =>
              <div key={key}>
                <br />
                <TextField
                  value={String(maps['grid-breakpoints'][key])}
                  type="number"
                  name={maps['grid-breakpoints'][key]}
                  label={key}
                  onChange={ e => handleMapsUpdate(e, key, 'grid-breakpoints') }
                />
              </div>
            )
          } */}

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

