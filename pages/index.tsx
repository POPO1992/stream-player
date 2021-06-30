import { Player } from '../components/Player/Player'
import { useIsClient } from '../hooks/useIsClient'

export default function Home() {
  const isClient = useIsClient()

  const handleError = (error: any) => {
    console.error("video error: ", error)
  }

  if (!isClient) return null

  return (
    <Player 
      autoPlay
      src={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}
      poster="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/14112506/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg"
      onError={handleError}
      muted={false}
    />
  )
}
