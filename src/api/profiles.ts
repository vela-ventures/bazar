import { readHandler } from 'api';

import { AOS } from 'helpers/config';
import { ProfileHeaderType, RegistryProfileType } from 'helpers/types';

export async function getProfileById(args: { profileId: string }): Promise<ProfileHeaderType | null> {
	const emptyProfile = {
		id: args.profileId,
		walletAddress: null,
		displayName: null,
		username: null,
		bio: null,
		avatar: null,
		banner: null,
	};

	try {
		const fetchedProfile = await readHandler({
			processId: args.profileId,
			action: 'Info',
			data: null,
		});

		if (fetchedProfile) {
			return {
				id: args.profileId,
				walletAddress: fetchedProfile.Owner || null,
				displayName: fetchedProfile.Profile.DisplayName || null,
				username: fetchedProfile.Profile.UserName || null,
				bio: fetchedProfile.Profile.Description || null,
				avatar: fetchedProfile.Profile.ProfileImage || null,
				banner: fetchedProfile.Profile.CoverImage || null,
			};
		} else return emptyProfile;
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function getProfileByWalletAddress(args: { address: string }): Promise<ProfileHeaderType | null> {
	const emptyProfile = {
		id: null,
		walletAddress: args.address,
		displayName: null,
		username: null,
		bio: null,
		avatar: null,
		banner: null,
	};

	try {
		const profileLookup = await readHandler({
			processId: AOS.profileRegistry,
			action: 'Get-Profiles-By-Delegate',
			data: { Address: args.address },
		});

		let activeProfileId: string;
		if (profileLookup && profileLookup.length > 0 && profileLookup[0].ProfileId) {
			activeProfileId = profileLookup[0].ProfileId;
		}

		if (activeProfileId) {
			const fetchedProfile = await readHandler({
				processId: activeProfileId,
				action: 'Info',
				data: null,
			});

			if (fetchedProfile) {
				return {
					id: activeProfileId,
					walletAddress: fetchedProfile.Owner || null,
					displayName: fetchedProfile.Profile.DisplayName || null,
					username: fetchedProfile.Profile.UserName || null,
					bio: fetchedProfile.Profile.Description || null,
					avatar: fetchedProfile.Profile.ProfileImage || null,
					banner: fetchedProfile.Profile.CoverImage || null,
				};
			} else return emptyProfile;
		} else return emptyProfile;
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function getRegistryProfiles(args: { profileIds: string[] }): Promise<RegistryProfileType[]> {
	try {
		const metadataLookup = await readHandler({
			processId: AOS.profileRegistry,
			action: 'Get-Metadata-By-ProfileIds',
			data: { ProfileIds: args.profileIds },
		});

		if (metadataLookup && metadataLookup.length) {
			return metadataLookup.map(
				(profile: { ProfileId: string; Username: string; ProfileImage: string; Description?: string }) => {
					return {
						id: profile.ProfileId,
						username: profile.Username,
						avatar: profile.ProfileImage,
						bio: profile.Description ?? null,
					};
				}
			);
		}

		return [];
	} catch (e: any) {
		throw new Error(e);
	}
}
