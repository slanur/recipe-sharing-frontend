import { useCallback, useEffect, useState } from 'react'
import { createTag, deleteTag, getTags, updateTag } from '@/api/tags.api'
import type { Tag } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isActive = true
    getTags()
      .then((data) => {
        if (isActive) setTags(data)
      })
      .catch((loadError) => {
        if (isActive) {
          setError(getErrorMessage(loadError, "Tag'ler yüklenemedi"))
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })
    return () => {
      isActive = false
    }
  }, [reloadCount])

  const reload = useCallback(() => {
    setIsLoading(true)
    setError('')
    setReloadCount((count) => count + 1)
  }, [])

  const addTag = useCallback(async (name: string) => {
    const tag = await createTag(name)
    setTags((current) => [...current, tag])
  }, [])

  const renameTag = useCallback(async (id: string, name: string) => {
    const tag = await updateTag(id, name)
    setTags((current) =>
      current.map((item) => (item.id === id ? tag : item)),
    )
  }, [])

  const removeTag = useCallback(async (id: string) => {
    await deleteTag(id)
    setTags((current) => current.filter((item) => item.id !== id))
  }, [])

  return { tags, isLoading, error, reload, addTag, renameTag, removeTag }
}
