import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const useDataPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setInternalPage] = useState(Number(searchParams.get('page')) || 1)

  const setPage = (newPage: number) => {
    setInternalPage(newPage)
    setSearchParams({page: String(newPage)})
  }

  return {
    page,
    setPage
  }
}

export default useDataPage