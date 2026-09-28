import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [open, setOpen] = useState(false)

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
    const targetDate = new Date(
      "2026-12-28T10:00:00+07:00"
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

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  if (open) {
    return (
      <main className="content">

        <audio id="wedding-music" autoPlay loop>
          <source src="/lagu.mp3" type="audio/mpeg" />
        </audio>

        <button
          className="music-button"
          onClick={() => {
            const music =
              document.getElementById("wedding-music")

            if (music.paused) {
              music.play()
            } else {
              music.pause()
            }
          }}
        >
          🎵
        </button>

        <p className="small-title">
          THE BRIDE & GROOM
        </p>

        <img
          src="/foto-mempelai.jpeg"
          alt="Foto mempelai"
          className="couple-photo"
        />

        <h1>Andi</h1>

        <p>
          Putra dari Bapak ... & Ibu ...
        </p>

        <div className="and">
          &
        </div>

        <h1>Sinta</h1>

        <p>
          Putri dari Bapak ... & Ibu ...
        </p>

        <div className="line"></div>

        <p>
          28 Desember 2026
        </p>

        <section className="countdown">
          <h2>
            Menuju Hari Bahagia
          </h2>

          <div className="countdown-grid">

            <div>
              <strong>{timeLeft.days}</strong>
              <span>HARI</span>
            </div>

            <div>
              <strong>{timeLeft.hours}</strong>
              <span>JAM</span>
            </div>

            <div>
              <strong>{timeLeft.minutes}</strong>
              <span>MENIT</span>
            </div>

            <div>
              <strong>{timeLeft.seconds}</strong>
              <span>DETIK</span>
            </div>

          </div>
        </section>

        <section className="event">

          <h2>
            Akad & Resepsi
          </h2>

          <p>
            Senin, 28 Desember 2026
          </p>

          <p>
            10.00 WIB – selesai
          </p>

          <p>
            Gedung Pernikahan
            <br />
            Jl. Contoh No. 123, Bandung
          </p>

          <a
            href="https://maps.app.goo.gl/GmPRdSJiWx944U8a6"
            target="_blank"
            rel="noreferrer"
          >
            LIHAT LOKASI
          </a>

        </section>

        <section className="gallery">

          <h2>
            Our Moments
          </h2>

          <div className="gallery-grid">

            <img
              src="/foto1.jpeg"
              alt="Momen 1"
            />

            <img
              src="/foto2.jpeg"
              alt="Momen 2"
            />

            <img
              src="/foto3.jpeg"
              alt="Momen 3"
            />

          </div>

        </section>

        <section className="rsvp">

          <h2>
            Konfirmasi Kehadiran
          </h2>

          <p>
            Mohon konfirmasi kehadiran Anda
            <br />
            melalui WhatsApp.
          </p>

          <a
            href="https://wa.me/6289649930058?text=Halo%20saya%20akan%20hadir%20di%20pernikahan%20Andi%20dan%20Sinta"
            target="_blank"
            rel="noreferrer"
          >
            KONFIRMASI VIA WHATSAPP
          </a>

        </section>

        <section className="closing">

          <p>
            Terima kasih atas doa dan kehadiran
            <br />
            di hari bahagia kami.
          </p>

          <h2>
            Andi & Sinta
          </h2>

          <p className="closing-date">
            28 Desember 2026
          </p>

        </section>

      </main>
    )
  }

  return (
    <main className="cover">

      <div className="cover-card">

        <p className="small-title">
          THE WEDDING OF
        </p>

        <h1>
          Andi & Sinta
        </h1>

        <img
          src="/foto-mempelai.jpeg"
          alt="Andi dan Sinta"
          className="cover-photo"
        />

        <p className="guest-label">
          Kepada Yth.
        </p>

        <p className="guest-name">
          {guestName}
        </p>

        <p className="date">
          28 DESEMBER 2026
        </p>

        <div className="line"></div>

        <p className="invitation-text">
          Dengan penuh kebahagiaan,
          <br />
          kami mengundang Anda untuk hadir
          <br />
          di hari istimewa kami.
        </p>

        <button
          onClick={() => setOpen(true)}
        >
          BUKA UNDANGAN
        </button>

      </div>

    </main>
  )
}

export default App