/*
 * @Author: lijunwei
 * @Date: 2021-11-15 17:24:19
 * @LastEditTime: 2022-01-14 11:28:39
 * @LastEditors: lijunwei
 * @Description: 
 */

import { AppProvider, Frame } from "@shopify/polaris";
import logo from "./logo.svg"
import en from '@shopify/polaris/locales/en.json';
import { Editor } from "./views/Editor";
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  const theme = {
    logo: {
      width: 120,
      topBarSource: logo,
      // url: '/users',
      accessibilityLabel: 'Editor',
      contextualSaveBarSource: logo,
    },
  };

  return (
    <AppProvider
      i18n={en}
      theme={theme}
    >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Editor /> }></Route>
          </Routes>
        </BrowserRouter>
        
    </AppProvider>

  );
}

export default App;
