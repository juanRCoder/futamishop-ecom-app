import { ThemeProviderContext } from "@/stores/theme/themeContext"
import { useContext } from "react"


export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}