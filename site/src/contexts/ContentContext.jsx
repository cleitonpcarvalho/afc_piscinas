import { createContext, useContext, useEffect, useState } from 'react'
import { getPageContent } from '../services/api'

const ContentContext = createContext({})

export function ContentProvider({ pageSlug, children }) {
  const [sections, setSections] = useState({})

  useEffect(() => {
    getPageContent(pageSlug)
      .then(setSections)
      .catch(() => {})
  }, [pageSlug])

  return (
    <ContentContext.Provider value={sections}>
      {children}
    </ContentContext.Provider>
  )
}

// Retorna o conteúdo de uma secção pelo slug, ou {} se ainda não carregou
export function useSection(slug) {
  return useContext(ContentContext)[slug] || {}
}
