import { HashRouter, Routes as Router, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { RecentUploads } from '@renderer/pages/recent Uploads'
export function Routes(): JSX.Element {
  return (
    <HashRouter>
      <Router>
        <Route path="/" Component={Home} />
        <Route path="/uploads" Component={RecentUploads} />
      </Router>
    </HashRouter>
  )
}
