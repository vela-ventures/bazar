import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { readHandler } from 'api';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { Banner } from 'components/organisms/Banner';
import { AO, ASSETS, DOM, URLS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { Footer } from 'navigation/footer';
import { Header } from 'navigation/Header';
import { useLocationProvider } from 'providers/LocationProvider';
import { RootState } from 'store';
import * as currencyActions from 'store/currencies/actions';
import * as streakActions from 'store/streaks/actions';
import * as ucmActions from 'store/ucm/actions';
import { getCampaignBackground } from 'views/Campaign';

import * as S from './styles';

const Routes = lazy(() =>
	import(`../routes/Routes.tsx` as any).then((module) => ({
		default: module.default,
	}))
);

export default function App() {
	const dispatch = useDispatch();

	const ucmReducer = useSelector((state: RootState) => state.ucmReducer);
	const currenciesReducer = useSelector((state: RootState) => state.currenciesReducer);

	const locationProvider = useLocationProvider();

	const [showCampaign, setShowCampaign] = React.useState<boolean>(false);

	React.useEffect(() => {
		const campaignShown = localStorage.getItem('campaignShown');
		console.log(locationProvider.country);
		if (locationProvider.country !== 'US' && !campaignShown) {
			setShowCampaign(true);
			localStorage.setItem('campaignShown', 'true');
		} else {
			setShowCampaign(false);
		}
	}, [locationProvider.country]);

	React.useEffect(() => {
		(async function () {
			try {
				const ucmState = await readHandler({
					processId: AO.ucm,
					action: 'Info',
				});
				dispatch(ucmActions.setUCM(ucmState));

				const streaks = await readHandler({
					processId: AO.pixl,
					action: 'Get-Streaks',
				});
				if (streaks.Streaks) {
					for (let key in streaks.Streaks) {
						if (streaks.Streaks[key].days === 0) {
							delete streaks.Streaks[key];
						}
					}
					dispatch(streakActions.setStreaks(streaks.Streaks));
				}

				if (!currenciesReducer) {
					const defaultTokenState = await readHandler({
						processId: AO.defaultToken,
						action: 'Info',
					});
					const pixlState = await readHandler({
						processId: AO.pixl,
						action: 'Info',
					});

					dispatch(
						currencyActions.setCurrencies({
							[AO.defaultToken]: {
								...defaultTokenState,
							},
							[AO.pixl]: {
								...pixlState,
							},
						})
					);
				}
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, [currenciesReducer, dispatch]);

	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.notification} />
			<div id={DOM.overlay} />
			{ucmReducer ? (
				<Suspense fallback={<Loader />}>
					<S.AppWrapper>
						<Banner />
						<Header />
						<S.View className={'max-view-wrapper'}>
							<Routes />
						</S.View>
						<Footer />
					</S.AppWrapper>
					{showCampaign && (
						<Modal header={null} handleClose={() => setShowCampaign(false)}>
							<S.CampaignWrapper>
								<div className={'content'}>
									<S.CampaignSubheader>
										<p>A tomb opens, and a legend stirs. Do you have what it takes to awaken The Omega One? </p>
									</S.CampaignSubheader>
									<S.PrimaryAssetWrapper>
										<S.PrimaryAssetOverlay>
											<ReactSVG src={ASSETS.question} className={'fade-in'} />
										</S.PrimaryAssetOverlay>
										<img src={getTxEndpoint('Nt58KmL01idgtiDU2BQFWZObEbejnhfFdVyfCEFkEdU')} />
										<S.CampaignAction>
											<Link to={URLS.quest} onClick={() => setShowCampaign(false)}>
												<span>Join the quest</span>
											</Link>
										</S.CampaignAction>
									</S.PrimaryAssetWrapper>
								</div>
								{getCampaignBackground()}
							</S.CampaignWrapper>
						</Modal>
					)}
				</Suspense>
			) : (
				<div className={'app-loader'}>
					<ReactSVG src={ASSETS.logo} />
				</div>
			)}
		</>
	);
}
