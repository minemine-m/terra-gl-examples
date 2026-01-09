import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'zh', // Default to Chinese as requested ("根据terra来", TerraGL seems to be Chinese-friendly/origin)
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

export default i18n
