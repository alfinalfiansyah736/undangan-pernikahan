import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [open, setOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  const [guestMessage, setGuestMessage] = useState("")

  const [guestMessages, setGuestMessages] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("weddingMessages") || "[]"
      )
    } catch {
      return []
    }
  })

  const params = new URLSearchParams(window.location.search)

  const guestName =
    params.get("to") || "Bapak/Ibu/Saudara/i"

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // ==================================================
  // COUNTDOWN
  // ==================================================

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

  // ==================================================
  // SCROLL ANIMATION
  // ==================================================

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

  // ==================================================
  // OPEN INVITATION + MUSIC
  // ==================================================

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

  // ==================================================
  // TOGGLE MUSIC
  // ==================================================

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

  // ==================================================
  // KIRIM UCAPAN
  // ==================================================

  const submitGuestMessage = (event) => {
    event.preventDefault()

    if (!guestMessage.trim()) {
      return
    }

    const newMessage = {
      name: guestName,
      message: guestMessage.trim(),
    }

    const updatedMessages = [
      ...guestMessages,
      newMessage,
    ]

    setGuestMessages(updatedMessages)

    localStorage.setItem(
      "weddingMessages",
      JSON.stringify(updatedMessages)
    )

    setGuestMessage("")
  }

  // ==================================================
  // ISI UNDANGAN
  // ==================================================

  if (open) {
    return (
      <main className="content">

        {/* FLOWER */}
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

        {/* MUSIC */}
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

        {/* ==================================================
            SLIDE 1 - R & S
        ================================================== */}

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

        {/* ==================================================
            SLIDE 2 - DOA
        ================================================== */}

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

        {/* ==================================================
            SLIDE 3 - BRIDE
        ================================================== */}

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

        {/* ==================================================
            AMPERSAND
        ================================================== */}

        <section className="ampersand-between animate-on-scroll">
          <div className="and">
            &
          </div>
        </section>

        {/* ==================================================
            SLIDE 4 - GROOM
        ================================================== */}

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

        {/* ==================================================
            SLIDE 5 - COUPLE
        ================================================== */}

        <section className="full-screen-section couple-together animate-on-scroll">

          <div className="line"></div>

        </section>

        {/* ==================================================
            SLIDE 6 - COUNTDOWN
        ================================================== */}

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

        {/* ==================================================
            SLIDE 7 - EVENT
        ================================================== */}

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

        {/* ==================================================
            SLIDE 8 - KONFIRMASI & UCAPAN
        ================================================== */}

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
                  (item, index) => (
                    <div
                      className="guest-message"
                      key={index}
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

        {/* ==================================================
            SLIDE 9 - CLOSING
        ================================================== */}

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

  // ==================================================
  // COVER DEPAN
  // ==================================================

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