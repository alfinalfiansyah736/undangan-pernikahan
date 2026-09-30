import { useEffect, useState } from "react"
import "./App.css"
import { supabase } from "./supabaseClient"

function App() {
  const [open, setOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  const [guestMessage, setGuestMessage] = useState("")
  const [guestMessages, setGuestMessages] = useState([])

  const params = new URLSearchParams(window.location.search)

  const guestName =
    params.get("to") || "Bapak/Ibu/Saudara/i"

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const loadGuestMessages = async () => {
      const { data, error } = await supabase
        .from("guest_messages")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Gagal mengambil ucapan:", error)
        return
      }

      setGuestMessages(data || [])
    }

    loadGuestMessages()
  }, [])

  useEffect(() => {
    const targetDate = new Date(
      "2026-10-17T09:00:00+07:00"
    ).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      })
    }

    updateCountdown()

    const timer = setInterval(
      updateCountdown,
      1000
    )

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!open) return

    const sections = document.querySelectorAll(
      ".animate-on-scroll"
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      {
        threshold: 0.15,
      }
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [open])

  const openInvitation = () => {
    setOpen(true)

    setTimeout(() => {
      const music =
        document.getElementById(
          "wedding-music"
        )

      if (music) {
        music
          .play()
          .then(() => {
            setMusicPlaying(true)
          })
          .catch(() => {
            setMusicPlaying(false)
          })
      }
    }, 100)
  }

  const toggleMusic = () => {
    const music =
      document.getElementById(
        "wedding-music"
      )

    if (!music) return

    if (music.paused) {
      music
        .play()
        .then(() => {
          setMusicPlaying(true)
        })
        .catch(() => {
          setMusicPlaying(false)
        })
    } else {
      music.pause()
      setMusicPlaying(false)
    }
  }

  const submitGuestMessage = async (event) => {
    event.preventDefault()

    if (!guestMessage.trim()) {
      return
    }

    const newMessage = {
      name: guestName,
      message: guestMessage.trim(),
    }

    const { data, error } = await supabase
      .from("guest_messages")
      .insert(newMessage)
      .select("id, name, message, created_at")
      .single()

    if (error) {
      console.error("SUPABASE ERROR:", error)

      alert(
        `Ucapan gagal dikirim.\n\nError: ${error.message}`
      )

      return
    }

    setGuestMessages((currentMessages) => [
      data,
      ...currentMessages,
    ])

    setGuestMessage("")

    alert("Ucapan berhasil dikirim!")
  }

  if (open) {
    return (
      <main className="content">

        <div className="floating-flower flower-1">
          ❀
        </div>

        <div className="floating-flower flower-2">
          ✿
        </div>

        <div className="floating-flower flower-3">
          ❀
        </div>

        <div className="floating-flower flower-4">
          ✿
        </div>

        <audio
          id="wedding-music"
          loop
        >
          <source
            src="/lagu.mp3"
            type="audio/mpeg"
          />
        </audio>

        <button
          className="music-button"
          onClick={toggleMusic}
          aria-label={
            musicPlaying
              ? "Matikan musik"
              : "Nyalakan musik"
          }
        >
          {musicPlaying ? "🎵" : "🔇"}
        </button>

        {/* INTRO */}

        <section className="full-screen-section intro-section animate-on-scroll">

          <div className="intro-card">

            <div className="initials">
              R <span>&</span> S
            </div>

            <div className="intro-names">

              <div>
                <p>
                  Rossyana Dewi
                  <br />
                  Gustriandini
                </p>
              </div>

              <span>&</span>

              <div>
                <p>
                  Muhamad Salman
                  <br />
                  Zhaafir Satrio
                </p>
              </div>

            </div>

            <div className="intro-date">
              17 Oktober 2026
            </div>

          </div>

        </section>

        {/* AYAT */}

        <section className="full-screen-section wedding-verse-section animate-on-scroll">

          <div className="wedding-verse">

            <div className="verse-divider">
              ❦
            </div>

            <p className="verse-text">
              “Dan di antara tanda-tanda
              kebesaran-Nya,
              <br />
              Dia menciptakan pasangan agar
              kamu memperoleh
              <br />
              ketenteraman, dan Dia menjadikan
              di antara kamu
              <br />
              rasa kasih dan sayang.”
            </p>

            <span className="verse-reference">
              — QS. Ar-Rum: 21
            </span>

          </div>

        </section>

        {/* BRIDE */}

        <section className="full-screen-section couple-section animate-on-scroll">

          <p className="small-title">
            THE BRIDE
          </p>

          <img
            src="/foto-cewe.jpeg"
            alt="Rossyana Dewi Gustriandini"
            className="couple-photo"
          />

          <h1>
            Rossyana Dewi Gustriandini
          </h1>

          <p>
            Putri dari Bapak R.E Wijaya Mulyana
            dan
            <br />
            Ibu Euis Fitri Rosdiany R
          </p>

        </section>

        {/* AMPERSAND */}

        <section className="ampersand-between animate-on-scroll">

          <div className="and">
            &
          </div>

        </section>

        {/* GROOM */}

        <section className="full-screen-section couple-section animate-on-scroll">

          <p className="small-title">
            THE GROOM
          </p>

          <img
            src="/foto-cowo.jpeg"
            alt="Muhamad Salman Zhaafir Satrio"
            className="couple-photo"
          />

          <h1>
            Muhamad Salman Zhaafir Satrio
          </h1>

          <p>
            Putra dari Bapak Heriyanto dan
            <br />
            Ibu Sri Ratnawati
          </p>

        </section>

        {/* COUNTDOWN */}

        <section className="full-screen-section countdown countdown-background animate-on-scroll">

          <div className="countdown-overlay"></div>

          <div className="countdown-content">

            <p className="countdown-subtitle">
              Dengan penuh kebahagiaan
            </p>

            <h2>
              Menuju Hari Bahagia
            </h2>

            <p className="countdown-date">
              Sabtu, 17 Oktober 2026
            </p>

            <div className="countdown-grid">

              <div>
                <strong>
                  {timeLeft.days}
                </strong>

                <span>
                  HARI
                </span>
              </div>

              <div>
                <strong>
                  {timeLeft.hours}
                </strong>

                <span>
                  JAM
                </span>
              </div>

              <div>
                <strong>
                  {timeLeft.minutes}
                </strong>

                <span>
                  MENIT
                </span>
              </div>

              <div>
                <strong>
                  {timeLeft.seconds}
                </strong>

                <span>
                  DETIK
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ACARA */}

        <section className="full-screen-section event animate-on-scroll">

          <h2>
            Acara
          </h2>

          <p>
            Sabtu, 17 Oktober 2026
          </p>

          <p>
            09.00 WIB – 11.30 WIB
          </p>

          <p>
            Komplek Gading Tutuka 1
            <br />
            Blok C2/37
            <br />
            RT 003 RW 012
          </p>

          <a
            href="https://maps.app.goo.gl/xmWmnf1BBXYo9SX37?g_st=iw"
            target="_blank"
            rel="noreferrer"
          >
            LIHAT LOKASI
          </a>

        </section>

        {/* RSVP */}

        <section className="full-screen-section rsvp animate-on-scroll">

          <div className="rsvp-card">

            <p className="rsvp-small-title">
              KONFIRMASI KEHADIRAN
            </p>

            <h2>
              Dear Muhamad Salman
              <br />
              & Rossyana Dewi
            </h2>

            <form
              className="guest-message-form"
              onSubmit={submitGuestMessage}
            >

              <input
                type="text"
                value={guestName}
                readOnly
                placeholder="Nama Anda"
              />

              <textarea
                value={guestMessage}
                onChange={(event) =>
                  setGuestMessage(
                    event.target.value
                  )
                }
                placeholder="Tulis ucapan untuk mempelai..."
                rows="4"
              />

              <button type="submit">
                KIRIM KONFIRMASI
              </button>

            </form>

            <div className="guest-messages">

              <h3>
                Ucapan & Doa
              </h3>

              {guestMessages.length === 0 ? (
                <p className="no-message">
                  Belum ada ucapan.
                </p>
              ) : (
                guestMessages.map(
                  (item) => (
                    <div
                      className="guest-message"
                      key={item.id}
                    >

                      <strong>
                        {item.name}
                      </strong>

                      <p>
                        {item.message}
                      </p>

                    </div>
                  )
                )
              )}

            </div>

          </div>

        </section>

        {/* PENUTUP */}

        <section className="full-screen-section closing closing-background animate-on-scroll">

          <div className="closing-overlay"></div>

          <div className="closing-content">

            <p>
              Terima kasih atas doa dan kehadiran
              <br />
              di hari bahagia kami.
            </p>

            <h2>
              Muhamad Salman Zhaafir Satrio
              <br />
              &
              <br />
              Rossyana Dewi Gustriandini
            </h2>

            <p className="closing-date">
              17 Oktober 2026
            </p>

          </div>

        </section>

      </main>
    )
  }

  {/* COVER */}

  return (
    <main className="cover">

      <div className="cover-card">

        <p className="small-title">
          THE WEDDING OF
        </p>

        <h1>
          Muhamad Salman
          <br />
          &
          <br />
          Rossyana Dewi
        </h1>

        <img
          src="/foto-mempelai.jpeg"
          alt="Mempelai"
          className="cover-photo"
        />

        <p className="guest-label">
          Kepada Yth.
        </p>

        <p className="guest-name">
          {guestName}
        </p>

        <p className="date">
          17 OKTOBER 2026
        </p>

        <div className="line"></div>

        <p className="invitation-text">
          Dengan penuh kebahagiaan,
          <br />
          kami mengundang Anda untuk hadir
          <br />
          di acara istimewa kami.
        </p>

        <button
          onClick={openInvitation}
        >
          BUKA UNDANGAN
        </button>

      </div>

    </main>
  )
}

export default App