import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, lightTheme } from 'naive-ui'
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'


const baseThemeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '6px',
    heightLarge: '40px',
    fontSizeLarge: '18px'
  }
}


const PrimaryColor = '#596b47'
const isDark = useDark()
const toggleDark = useToggle(isDark)

export function useTheme() {
  const defaultTheme = computed(() => {
    return lightTheme
  })
  const themeRevert = computed(() => {
    return darkTheme
  })

  const currentTheme = computed(() => {
    return isDark.value ? darkTheme : lightTheme
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
      common: {
        ...baseThemeOverrides.common,
        primaryColor: PrimaryColor,
        primaryColorHover: lightenDarkenColor(PrimaryColor, 30),
        primaryColorPressed: lightenDarkenColor(PrimaryColor, -30),
        primaryColorSuppl: getComplementaryColor(PrimaryColor)
        // 设置全站默认背景色
        // bodyColor: isDark.value ? '#121212' : '#f8f9fa'

        // 还可以顺便设置卡片/容器等组件的默认背景色（可选）
        // cardColor: isDark.value ? '#1e1e20' : '#ffffff'
      },
      Input: {
        placeholderColor: '#a8aeb8'
      }
    }
  })


  return {
    isDark,
    defaultTheme,
    themeRevert,
    themeOverrides,
    currentTheme,
    toggleDark
  }
}

function lightenDarkenColor(col, amt) {
  let usePound = false

  if (col[0] === '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

function getComplementaryColor(hex) {
  hex = hex.slice(1) // remove #
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // get the complementary color
  const compR = (255 - r).toString(16).padStart(2, '0')
  const compG = (255 - g).toString(16).padStart(2, '0')
  const compB = (255 - b).toString(16).padStart(2, '0')

  return `#${ compR }${ compG }${ compB }`
}

