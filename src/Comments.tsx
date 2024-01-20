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
  const [loading, setLoading] = useState(false)
  const [activeTag, setActiveTag] = useState(0)
  const [newComment, setNewComment] = useState('')

  const activeCls = "text-blue-500 hover:text-blue-600"
  const noActiveCls = "hover:text-blue-600"

  function rearrange(params: number) {
    let newList
    activeTag !== params && setActiveTag(params)
    if (params === 1) {
      newList = list.sort((a: Comment, b: Comment) => {
        return dayjs(a.createdTime).valueOf() - dayjs(b.createdTime).valueOf()
      })
    } else {
      newList = list.sort((a: Comment, b: Comment) => {
        return b.likeCount - a.likeCount
      })
    }
    setList([...newList])
  }
  function doComment () {
    setList([...list, {...userInfo, content: newComment, createdTime: dayjs().format('MM-DD HH:mm'), likeCount: 0}])
    setNewComment('')
  }
  useEffect(() => {
    async function getComments() {
      setLoading(true)
      const res = await axios.get('http://localhost:3000/comments')
      setList(res.data.list)
      setLoading(false)
    }
    getComments()
  }, [])
  return (
    loading ? <Loading /> :
    <div className="border border-neutral-50 rounded-lg py-6 px-10">
      <div className="flex items-end">
        <div className="text-2xl font-bold mr-10">{list.length} Comments</div>
        <div>
          <button className={!activeTag ? activeCls : noActiveCls} onClick={() => rearrange(0)}>Hotest</button>
          <span className="mx-2">|</span>
          <button className={activeTag ? activeCls : noActiveCls} onClick={() => rearrange(1)}>Newest</button>
        </div>
      </div>
      <div className="flex items-center mt-4 mb-12">
        <img className="shrink-0 h-12 w-12 rounded-full mr-6" src={userInfo.profilePicture} />
        <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
          className="block w-full h-500 px-3 py-2 mr-6 bg-neutral-200 border border-neutral-900 rounded-md text-md shadow-sm text-neutral-900 placeholder-neutral-500
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
        <button onClick={() => newComment && doComment()} className="w-auto py-2 px-3 bg-blue-500 hover:bg-blue-600 text-md font-semibold rounded-md shadow focus:outline-none cursor-pointer">
          Comment
        </button>
      </div>
      <ul>
        {list.map((i:Comment) =>
          <li key={i.id} className="flex pt-2">
            <img className="shrink-0 h-12 w-12 rounded-full mr-6" src={i.profilePicture} />
            <div className="border-b border-neutral-600 pb-2 w-full">
              <div className="text-neutral-400 font-bold">{i.username}</div>
              <div className="text-lg my-2">{i.content}</div>
              <div className="flex text-neutral-400">
                <div>{i.createdTime}</div>
                <div className="ml-5">like: {i.likeCount}</div>
              </div>
            </div>
          </li>
        )}
      </ul>
      </div>
  )
}

export { Comments }
