import HeadTag from '../components/HeadTag'

export default function Home() {
  return (
    <>
      <HeadTag
        description="Next.js App Starter from Alan W. Smith"
        image="https://nextjs-app-starter.alanwsmith.com/og-images/main.png"
        title="Next.js App Starter from Alan W. Smith"
        type="website"
        url="https://nextjs-app-starter.alanwsmith.com"
      />
      <h2>Notes</h2>
      <ul>
        <li>This is a basic Next.js starter with tailwind installed</li>
        <li>
          Some basic styles are applied in <code>styles/global.css</code>
        </li>
        <li>
          A basic global layout is defined in{' '}
          <code>components/LayoutMain.js</code>
        </li>
        <li>
          The <code>HeadTag</code> component sets metadata, favicons, and open
          graph images
        </li>
      </ul>
      <h2>Next steps:</h2>
      <ul>
        <li>
          Update favicons under <code>public/favicons</code>
        </li>
        <li>
          Update Open Graph image under <code>public/og-images/main.png</code>
        </li>
      </ul>
    </>
  )
}
