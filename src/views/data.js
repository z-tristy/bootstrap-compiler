
/**
 * @description: 生成 bootstrap 的数据 
*/

export function setBootstrapVariables() {
  return {
    'color': {
      title: 'Color', 
      inputType: 'color',
      variablesType: 'general',
      data: {
        'primary': '#1F9725',
        'secondary': '#141414',
        'inverse': '#F7F7F7',
        // light: '#F7F7F7',
        // dark: '#F7F7F7',
        'white': '#ffffff',
        'black': '#000000',
        'gray-100': '#F7F7F7',
        'gray-200': '#EBEBEB',
        'gray-300': '#D9D9D9',
        'gray-400': '#BFBFBF',
        'gray-500': '#737373',
        'gray-600': '#666666',
        'gray-700': '#4D4D4D',
        'gray-800': '#333333',
        'gray-900': '#1A1A1A',
        'success': '#52C41A',
        'warning': '#FAAD14',
        'danger': '#FF4D4F',
        'body-bg': '#ffffff',
        'body-color': '#000000',
      }
    },
    'spacers': {
      title: 'Spacers dasktop', 
      unit: 'rem',
      inputType: 'number',
      variablesType: 'maps',
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
    'spacers-base-phone-value': {
      title: 'Spacers mobile', 
      unit: 'rem',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        0: 0,
        1: .25, // 4
        2: .5, // 8
        3: 1, //16
        4: 1.25, //20
        5: 1.5, //24
        6: 2, //32
        7: 2.5, //40
        8: 3, //48
        9: 4, //64
      }
    },
    'grid-breakpoints': {
      title: 'Grid breakpoints', 
      unit: 'px',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        xs: 0,
        sm: 576,  // 576px
        md: 768,  // 768px
        lg: 1152, // 1152px
        xl: 1280, // 1280px
        xxl: 1440 // 1440px
      }
    },
    'container-max-widths': {
      title: 'container max widths', 
      unit: 'px',
      type: 'number',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        xs: 600,
        sm: 720,
        md: 768,
        lg: 960,
        xl: 1080,
        xxl: 1440
      }
    },
    'containers-padding-x': {
      title: 'Containers padding x', 
      unit: 'rem',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        xs: 1,
        md: 1.5,
        lg: 3
      }
    },
    'columns-gutter': {
      title: 'columns gutter', 
      unit: 'rem',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        xs: 1,
        lg: 1.5
      }
    },
    'border-width': {
      title: 'Border width',
      unit: 'px',
      inputType: 'number',
      data: {
        'border-width': '1'
      }
    },
    'font-size': {
      title: 'Font size',
      unit: 'rem',
      inputType: 'number',
      data: {
        'h1-font-size': '3',
        'h2-font-size': '2.5',
        'h3-font-size': '2',
        'h4-font-size': '1.5',
        'h5-font-size': '1.25',
        'h6-font-size': '1.125',
        'lead-font-size': '1.125',
      }
    },
    'display-font-sizes': {
      title: 'Display font size',
      unit: 'rem',
      inputType: 'number',
      variablesType: 'maps',
      data: {
        4: 6,
        5: 4
      }
    },
    'border-radius': {
      title: 'Border radius',
      unit: 'rem',
      inputType: 'number',
      data: {
        'border-radius': '.5',
        'border-radius-sm': '.375',
        'border-radius-lg': '1',
      }
    },
    'button-border-width': {
      title: 'Button border width',
      unit: 'px',
      inputType: 'number',
      data: {
        'btn-border-width': '2'
      }
    },
    'button': {
      title: 'Button',
      unit: 'rem',
      inputType: 'number',
      data: {
        'btn-padding-y': '.4375',
        'btn-padding-x': '1.5',
        'btn-font-size': '1',
      }
    },
    'button-lg': {
      title: 'Button Large',
      unit: 'rem',
      inputType: 'number',
      data: {
        'btn-padding-y-lg': '.59375',
        'btn-padding-x-lg': '2',
        'btn-font-size-lg': '1.125',
      }
    },
    "height-increment": {
      title: "Height increment",
      info: "最小高度和高度的基础值, 1-12号值分别为 height-increment * 1 - height-increment * 12",
      unit: 'rem',
      inputType: 'number',
      variablesType: 'general',
      data: {
        'height-increment': 5,
      }
    },
    "header-h": {
      title: "Header height",
      info: "pc端有点问题, header-h不再控制header的高度, 但是很多弹窗距离顶部的距离还在使用这个变量, 比如加购后的提示弹窗距离顶部的距离就是使用这个变量控制",
      unit: 'rem',
      inputType: 'number',
      variablesType: 'general',
      data: {
        'header-h': 4,
        'header-h-sm': 3.5,
      }
    },
    "rigig-wrapper-max-width": {
      title: "Text max width",
      unit: 'rem',
      inputType: 'number',
      variablesType: 'utilities',
      extraProperty: 'responsive: true,property: max-width,class: mw-text',
      data: {
        '1': 15,
        '2': 20,
        '3': 25,
        '4': 32.5,
        '5': 50
      }
    }
  }
}