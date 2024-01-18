import { useState, useEffect } from "react";
import { Loading } from './Loading.tsx'
import axios from 'axios'
import dayjs from 'dayjs'

type Comment = {
  createdTime: string,
  content: string,
  userId: string,
  username: string,
  profilePicture: string,
  likeCount: number,
  id?: string
}
const userInfo = {
  userId: '56',
  username: 'Kristen Ramos',
  profilePicture: 'https://i.pravatar.cc/150?img=56'
}

function Comments() {
  const [list, setList] = useState<Comment[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [activeTag, setActiveTag] = useState(0)
  const [newComment, setNewComment] = useState('')

  const activeCls = "text-blue-500 hover:text-blue-600"
  const noActiveCls = "hover:text-blue-600"

  function rearrange(params: number) {
    let newList
    activeTag !== params && setActiveTag(params)
    if (params === 0) {
      newList = list.sort((a: Comment, b: Comment) => {
        return dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf()
      })
    } else {
      newList = list.sort((a: Comment, b: Comment) => {
        return b.likeCount - a.likeCount
      })
    }
    setList([...newList])
  }
  function doComment () {
    console.log(newComment)
    setList([...list, {...userInfo, content: newComment, createdTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), likeCount: 0}])
    setNewComment('')
  }
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3000/comments').then(res => {
      setList(res.data.list)
      setCount(res.data.count)
      setLoading(false)
    }).catch(err => {
      throw new Error(err)
    })
  }, [])
  return (
    loading ? <Loading /> :
    <div className="border border-slate-50 rounded-lg p-5">
      <div className="flex items-end">
        <div className="text-2xl font-bold mr-10">{count} Comments</div>
        <div>
          <button className={!activeTag ? activeCls : noActiveCls} onClick={() => rearrange(0)}>Hotest</button>
          <span className="mx-2">|</span>
          <button className={activeTag ? activeCls : noActiveCls} onClick={() => rearrange(1)}>Newest</button>
        </div>
      </div>
      <div className="flex items-center my-4">
        <img className="shrink-0 h-12 w-12 rounded-full mr-6" src={userInfo.profilePicture} />
        <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
          className="block w-full h-500 px-3 py-2 mr-6 bg-neutral-200 border border-slate-900 rounded-md text-md shadow-sm text-slate-900 placeholder-slate-500
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
        <button onClick={doComment} className="w-auto py-2 px-3 bg-blue-500 hover:bg-blue-600 text-md font-semibold rounded-md shadow focus:outline-none cursor-pointer">
          Comment
        </button>
      </div>
      <ul>
        {list.map((i:Comment) => <li key={i.id}>{i.content} | {i.createdTime} | {i.likeCount}</li>)}
      </ul>
      </div>
  )
}

export { Comments }
