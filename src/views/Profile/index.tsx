import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getProfile } from 'api';

import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/molecules/URLTabs';
import { CollectionsList } from 'components/organisms/CollectionsList';
import { URLS } from 'helpers/config';
import { ProfileHeaderType } from 'helpers/types';
import { checkValidAddress } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { ProfileHeader } from './ProfileHeader';

export default function Profile() {
	const navigate = useNavigate();
	const { address, active } = useParams();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	// TODO: full profile type
	const [profile, setProfile] = React.useState<ProfileHeaderType | null>(null);

	React.useEffect(() => {
		if (!address && !active) navigate(URLS.notFound);
		if (address && !active) navigate(URLS.profileAssets(address));
	}, [address, active]);

	// TODO: get ao profile / catch no profile
	React.useEffect(() => {
		(async function () {
			if (address && checkValidAddress(address)) {
				try {
					const fetchedProfile = await getProfile({ address: address });
					setProfile(fetchedProfile);
				} catch (e: any) {
					console.error(e);
				}
			} else {
				navigate(URLS.notFound);
			}
		})();
	}, [address]);

	const TABS = [
		{
			label: language.assets,
			icon: null,
			disabled: false,
			url: URLS.profileAssets(address),
			view: () => <p>Coming soon!</p>,
		},
		{
			label: language.collections,
			icon: null,
			disabled: false,
			url: URLS.profileCollections(address),
			view: () => <CollectionsList owner={address} />,
		},
		{
			label: language.listings,
			icon: null,
			disabled: false,
			url: URLS.profileListings(address),
			view: () => <p>Coming soon!</p>,
		},
		{
			label: language.activity,
			icon: null,
			disabled: false,
			url: URLS.profileActivity(address),
			view: () => <p>Coming soon!</p>,
		},
	];

	const urlTabs = React.useMemo(() => {
		return <URLTabs tabs={TABS} activeUrl={TABS[0]!.url} />;
	}, [address]);

	return profile ? (
		<>
			<ProfileHeader profile={profile} />
			{urlTabs}
		</>
	) : (
		<Loader />
	);
}
