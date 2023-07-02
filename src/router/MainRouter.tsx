import { Route, Routes } from 'react-router-dom'
import { IRoute, routePublic } from '@/router/routes/routePublic'
import { routeDashboard } from '@/router/routes/routeDashboard'
import { CssBaseline } from '@mui/material'
import * as React from 'react'
import { ThemeSettingProvider } from '@/theme/theme'
import { routePokemons } from '@/router/routes/routePokemons'

const ReturnComponent = (Component: React.ComponentType) => {
    return <Component />
}

export const MainRouter = () => {
    const allRoutes: IRoute[] = [...routePublic, ...routeDashboard, ...routePokemons]

    return (
        <ThemeSettingProvider>
            <CssBaseline />
            <Routes>
                {allRoutes.map((route: IRoute) => {
                    return <Route path={route.path} element={ReturnComponent(route.element)} key={route.path} />
                })}
            </Routes>
        </ThemeSettingProvider>
    )
}
