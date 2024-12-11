import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { CurrencyLine } from 'components/atoms/CurrencyLine';
import { Loader } from 'components/atoms/Loader';
import { Panel } from 'components/molecules/Panel';
import { ProfileManage } from 'components/organisms/ProfileManage';
import { AO, ASSETS, REDIRECTS, URLS } from 'helpers/config';
import { formatAddress, formatCount, getTotalTokenBalance } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useCustomThemeProvider } from 'providers/CustomThemeProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function WalletConnect(_props: { callback?: () => void }) {
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();
	const themeProvider = useCustomThemeProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [showWalletDropdown, setShowWalletDropdown] = React.useState<boolean>(false);
	const [showProfileManage, setShowProfileManage] = React.useState<boolean>(false);

	const [copied, setCopied] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (arProvider.walletAddress) {
				if (arProvider.profile && arProvider.profile.username) {
					setLabel(arProvider.profile.username);
				} else {
					setLabel(formatAddress(arProvider.walletAddress, false));
				}
			} else {
				setLabel(language.connect);
			}
		}
	}, [showWallet, arProvider.walletAddress, arProvider.profile]);

	function handlePress() {
		if (arProvider.walletAddress) {
			setShowWalletDropdown(!showWalletDropdown);
		} else {
			arProvider.setWalletModalVisible(true);
		}
	}

	function handleDropdownAction(callback?: () => void) {
		if (callback) callback();
		setShowWalletDropdown(false);
	}

	function handleProfileAction() {
		if (arProvider.profile && arProvider.profile.id) {
			navigate(URLS.profileAssets(arProvider.profile.id));
		} else {
			setShowProfileManage(true);
		}
	}

	const copyAddress = React.useCallback(async (address: string) => {
		if (address) {
			if (address.length > 0) {
				await navigator.clipboard.writeText(address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, []);

	function handleToggleTheme() {
		themeProvider.setCurrent(themeProvider.current === 'light' ? 'dark' : 'light');
	}

	function handleDisconnect() {
		setShowWalletDropdown(false);
		arProvider.handleDisconnect();
	}

	const tokenLinks = {
		[AO.defaultToken]: {
			link: REDIRECTS.warDepot,
			label: language.getWrappedAr,
			target: '_blank',
		},
		[AO.pixl]: {
			link: `${URLS.asset}${AO.pixl}`,
			label: language.tradePixl,
			target: '',
		},
	};

	function getDropdown() {
		if (!arProvider.profile) return <Loader sm relative />;
		return (
			<>
				<S.DHeaderWrapper>
					<S.DHeaderFlex>
						<Avatar
							owner={arProvider.profile}
							dimensions={{ wrapper: 35, icon: 21.5 }}
							callback={() => handleDropdownAction(handleProfileAction)}
						/>
						<S.DHeader>
							<S.DNameWrapper>
								<p onClick={() => handleDropdownAction(handleProfileAction)}>{label}</p>
								{arProvider.vouch?.isVouched && (
									<div id={'vouch-check'}>
										<ReactSVG src={ASSETS.checkmark} />
										<S.Tooltip className={'info-text'} useBottom={true}>
											<span>{'You are vouched'}</span>
										</S.Tooltip>
									</div>
								)}
							</S.DNameWrapper>
							<span onClick={() => handleDropdownAction(handleProfileAction)}>
								{formatAddress(
									arProvider.profile && arProvider.profile.id ? arProvider.profile.id : arProvider.walletAddress,
									false
								)}
							</span>
						</S.DHeader>
					</S.DHeaderFlex>
				</S.DHeaderWrapper>
				<S.DBalancesWrapper className={'border-wrapper-alt1'}>
					<S.BalanceLine>
						<ReactSVG src={ASSETS.ar} />
						<span>{formatCount(arProvider.arBalance ? arProvider.arBalance.toString() : '0')}</span>
					</S.BalanceLine>
					{arProvider.tokenBalances && Object.keys(arProvider.tokenBalances).length > 0 && (
						<>
							{Object.keys(arProvider.tokenBalances).map((token: string) => {
								return (
									<S.BalanceLine key={token}>
										<CurrencyLine
											amount={getTotalTokenBalance(arProvider.tokenBalances[token])}
											currency={token}
											callback={() => handleDropdownAction(() => setShowWalletDropdown(false))}
											useReverseLayout
										/>
										{tokenLinks[token] && (
											<S.TokenLink>
												<Link
													to={tokenLinks[token].link}
													target={tokenLinks[token].target}
													onClick={() => handleDropdownAction(() => setShowWalletDropdown(false))}
												>
													<span>{tokenLinks[token].label}</span>
												</Link>
											</S.TokenLink>
										)}
									</S.BalanceLine>
								);
							})}
						</>
					)}
				</S.DBalancesWrapper>
				<S.DBodyWrapper>
					<li onClick={() => handleDropdownAction()}>
						<Link to={`${URLS.asset}${AO.defaultToken}`}>
							<ReactSVG src={ASSETS.activity} />
							{`${language.transferWar}`}
						</Link>
					</li>
					<li onClick={() => handleDropdownAction()}>
						<Link to={REDIRECTS.aox} target={'_blank'}>
							<ReactSVG src={ASSETS.bridge} />
							{`${language.arBridge}`}
						</Link>
					</li>
				</S.DBodyWrapper>
				<S.DBodyWrapper>
					<li onClick={() => handleDropdownAction(handleProfileAction)}>
						{arProvider.profile && arProvider.profile.id ? (
							<>
								<ReactSVG src={ASSETS.user} />
								{`${language.viewProfile}`}
							</>
						) : (
							<>
								<ReactSVG src={ASSETS.edit} />
								{`${language.createProfile}`}
							</>
						)}
					</li>
					{arProvider.profile && arProvider.profile.id && (
						<>
							<li onClick={() => handleDropdownAction(() => setShowProfileManage(true))}>
								<ReactSVG src={ASSETS.edit} />
								{language.editProfile}
							</li>
							<li onClick={() => copyAddress(arProvider.profile.id)}>
								<ReactSVG src={ASSETS.copy} />
								{copied ? `${language.copied}!` : language.copyProfileAddress}
							</li>
						</>
					)}
					<li onClick={handleToggleTheme}>
						{themeProvider.current === 'light' ? (
							<>
								<ReactSVG src={ASSETS.dark} /> {`${language.useDarkDisplay}`}
							</>
						) : (
							<>
								<ReactSVG src={ASSETS.light} /> {`${language.useLightDisplay}`}
							</>
						)}
					</li>
				</S.DBodyWrapper>
				<S.DFooterWrapper>
					<li onClick={handleDisconnect}>
						<ReactSVG src={ASSETS.disconnect} />
						{language.disconnect}
					</li>
				</S.DFooterWrapper>
			</>
		);
	}

	function getHeader() {
		return (
			<S.PWrapper>
				{arProvider.profile && !arProvider.profile.id && (
					<S.CAction className={'fade-in'}>
						<Button type={'alt1'} label={language.createProfile} handlePress={handleProfileAction} />
					</S.CAction>
				)}
				{label && (
					<S.LAction onClick={handlePress} className={'border-wrapper-primary'}>
						<span>{label}</span>
					</S.LAction>
				)}
				<Avatar owner={arProvider.profile} dimensions={{ wrapper: 35, icon: 21.5 }} callback={handlePress} />
			</S.PWrapper>
		);
	}

	function getView() {
		return (
			<S.Wrapper>
				{getHeader()}
				{showWalletDropdown && (
					<Panel
						open={showWalletDropdown}
						header={language.profileMenu}
						handleClose={() => setShowWalletDropdown(false)}
						width={375}
					>
						{getDropdown()}
					</Panel>
				)}
			</S.Wrapper>
		);
	}

	return (
		<>
			{getView()}
			{showProfileManage && (
				<Panel
					open={showProfileManage}
					header={arProvider.profile && arProvider.profile.id ? language.editProfile : `${language.createProfile}!`}
					handleClose={() => setShowProfileManage(false)}
				>
					<S.PManageWrapper>
						<ProfileManage
							profile={arProvider.profile && arProvider.profile.id ? arProvider.profile : null}
							handleClose={() => setShowProfileManage(false)}
							handleUpdate={null}
						/>
					</S.PManageWrapper>
				</Panel>
			)}
		</>
	);
}
