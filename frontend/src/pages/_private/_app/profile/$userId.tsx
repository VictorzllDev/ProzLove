import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ErrorPage } from '@/components/shared/error-page'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/contexts/AuthContext'
import { useGetUser } from '@/hooks/user/useGetUser'
import { calculateAge } from '@/utils/calculate-age.util'
import { ProfileBio } from './-components/bio'
import { ProfileHeader } from './-components/header'
// import { PhotoGrid } from './-components/photo-grid'
import { ProfileStats } from './-components/stats'

export const Route = createFileRoute('/_private/_app/profile/$userId')({
	component: Profile,
})

const profileData = {
	name: 'Cristiano',
	age: 40,
	location: 'São Paulo, Brasil',
	verified: true,
	profileImage:
		'https://s2-vogue.glbimg.com/zhBKpla4TVbQ-T8dWx2oQa4WZuI=/0x0:620x876/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_5dfbcf92c1a84b20a5da5024d398ff2f/internal_photos/bs/2022/4/A/6BljWMQHGvW5MykYAFdQ/2016-08-10-cristiano-ronaldo-models-underwear-01-1.jpg',
	bio: 'Apaixonada por viagens e fotografia. Designer de produto em São Paulo, sempre em busca de novas aventuras e boas conversas.',
}

const posts = [
	// 	{ id: '1', image: '/images/post1.jpg', likes: 1234, comments: 89 },
	// 	{ id: '2', image: '/images/post2.jpg', likes: 2567, comments: 134 },
	// 	{ id: '3', image: '/images/post3.jpg', likes: 892, comments: 45 },
	// 	{ id: '4', image: '/images/post4.jpg', likes: 3421, comments: 201 },
	// 	{ id: '5', image: '/images/post5.jpg', likes: 1567, comments: 78 },
	// 	{ id: '6', image: '/images/post6.jpg', likes: 4532, comments: 289 },
]

export default function Profile() {
	const { userId } = Route.useParams()
	const { isProfileLoading, profile, authUser } = useAuth()
	const user = useGetUser()

	const navigate = useNavigate()

	useEffect(() => {
		if (userId === authUser?.uid) {
			navigate({ to: '/profile/$userId', params: { userId: 'me' } })
		}

		if (userId !== 'me') {
			user.mutate({ id: userId })
		}
	}, [userId, user.mutate, authUser?.uid, navigate])

	if (isProfileLoading || !profile || user.isPending) {
		return <Spinner className="mx-auto h-dvh" />
	}

	if (user.isError) {
		return <ErrorPage />
	}

	return (
		<main className="min-h-screen bg-background pb-24">
			<div className="mx-auto max-w-md">
				<ProfileHeader
					name={user.data?.name || profile.name}
					age={calculateAge(String(user.data?.birthday || profile.birthday))}
					gender={user.data?.gender || profile.gender}
					location={profileData.location}
					verified={profileData.verified}
					profileImage={profileData.profileImage}
				/>

				<ProfileStats posts={posts.length} likes={12500} dislikes={892} />

				<ProfileBio bio={user.data?.bio || profile.bio} />

				{/* <PhotoGrid posts={posts} /> */}
			</div>
		</main>
	)
}
