import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'
import { ErrorPage } from '@/components/shared/error-page'
import { LoadingSplash } from '@/components/shared/splash'
import { useAuth } from '@/contexts/AuthContext'
import { useGetProfile } from '@/hooks/profile/useGetProfile'
import { calculateAge } from '@/utils/calculate-age.util'
import { ProfileBio } from './-components/bio'
import { ProfileHeader } from './-components/header'
// import { PhotoGrid } from './-components/photo-grid'
import { ProfileStats } from './-components/stats'
export const Route = createFileRoute('/_private/_app/_screens/profile/$userId')({
	component: Profile,
})

// const _posts = [
// 	{ id: '1', image: '/images/post1.jpg', likes: 1234, comments: 89 },
// 	{ id: '2', image: '/images/post2.jpg', likes: 2567, comments: 134 },
// 	{ id: '3', image: '/images/post3.jpg', likes: 892, comments: 45 },
// 	{ id: '4', image: '/images/post4.jpg', likes: 3421, comments: 201 },
// 	{ id: '5', image: '/images/post5.jpg', likes: 1567, comments: 78 },
// 	{ id: '6', image: '/images/post6.jpg', likes: 4532, comments: 289 },
// ]

export default function Profile() {
	const { userId } = Route.useParams()
	const { authUser } = useAuth()
	const navigate = useNavigate()
	const { data: userState, isLoading, isError } = useGetProfile(userId)

	useEffect(() => {
		if (userId && userId !== 'me' && userId === authUser?.uid) {
			navigate({ to: '/profile/$userId', params: { userId: 'me' } })
		}
	}, [userId, authUser?.uid, navigate])

	if (isLoading) {
		return <LoadingSplash />
	}

	if (isError || !userState) {
		return <ErrorPage />
	}
	return (
		<>
			<Header showBackButton={userId !== 'me'} />

			<main className="min-h-screen bg-background pb-24">
				<div className="mx-auto max-w-md">
					<ProfileHeader
						name={userState.name}
						age={calculateAge(String(userState.birthday))}
						gender={userState.gender}
						location={userState.location}
						verified={userState.verified}
						profileImage={userState?.photos.find((photo) => photo.isPrimary)?.url || ''}
						isMyProfile={userId === 'me'}
					/>

					<ProfileStats likes={userState.likes} dislikes={userState.dislikes} matches={userState.matches} />

					<ProfileBio bio={userState.bio} />

					{/* <PhotoGrid posts={posts} /> */}
				</div>
			</main>

			{userId === 'me' && <BottomNav />}
		</>
	)
}
