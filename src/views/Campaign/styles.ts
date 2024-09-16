import styled from 'styled-components';

import { shine } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	min-height: calc(100vh - (${STYLING.dimensions.nav.height} + 20px));
	width: 100%;
	/* background-image: url('https://arweave.net/BX69ET09R9FrjOA69RokJ9pFXuWw7wlAyaLUG269a2g');
	background-size: cover;
	background-position: center; */
	background: linear-gradient(180deg, #003a32, #5ea299, #00322b);
	padding: 40px 20px;
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		color: ${(props) => props.theme.colors.font.light1};
		text-align: center;
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-family: 'Frank Ruhl Libre', serif;
		text-shadow: 1.5px 1.5px #80f154;
	}

	img {
		width: 70%;
	}
`;

export const HeaderAction = styled.div`
	button {
		span {
			color: #5af650;
			text-shadow: 1.5px 1.5px 7.5px #5af650;
			font-weight: ${(props) => props.theme.typography.weight.bold};
			font-size: ${(props) => props.theme.typography.size.xLg};
			font-family: 'Frank Ruhl Libre', serif;
		}

		&:hover {
			span {
				color: #93f18d;
				text-shadow: 1.5px 1.5px 7.5px #80f154;
			}
		}
	}
`;

export const Subheader = styled.div`
	max-width: 90%;
	background: rgba(10, 10, 10, 0.625);
	padding: 30px;
	border-radius: ${STYLING.dimensions.radius.primary};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 30px;
	margin: 20px 0 0 0;

	p {
		line-height: 1.5;
		max-width: 800px;
		color: #f1cb6e;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: 'Frank Ruhl Libre', serif;
		text-align: center;
	}
`;

export const ProfileWrapper = styled.div<{ completed: boolean }>`
	max-width: 90%;
	background: rgba(10, 10, 10, 0.65);
	padding: 10px 20px;
	border: 1px solid #7ec9bf;
	border-radius: ${STYLING.dimensions.radius.alt2};
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	pointer-events: ${(props) => (props.completed ? 'none' : 'auto')};
	transition: all 100ms;

	span {
		color: #7ec9bf;
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: 'Frank Ruhl Libre', serif;
	}

	&:hover {
		cursor: ${(props) => (props.completed ? 'default' : 'pointer')};
		background: ${(props) => (props.completed ? 'rgba(10, 10, 10, 0.65)' : 'rgba(30, 30, 30, 0.65)')};
	}
`;

export const ProfileIndicator = styled.div<{ completed: boolean }>`
	width: 17.5px;
	height: 17.5px;
	background: ${(props) =>
		props.completed ? props.theme.colors.indicator.primary : props.theme.colors.warning.primary};
	background: ${(props) => (props.completed ? '#80F154' : props.theme.colors.warning.primary)};
	border-radius: 50%;
`;

export const Body = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
	padding: 0 20px;
	margin: 40px 0 0 0;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export const GridElement = styled.div<{ claimable: boolean }>`
	position: relative;
	overflow: hidden;

	img {
		height: 500px;
	}

	/* box-shadow: ${(props) => (props.claimable ? '0 0 25px 5px #80f154' : 'none')}; */
	box-shadow: ${(props) => (props.claimable ? 'none' : 'none')};
	/* box-shadow: 0 0 25px 5px #80f154; */

	&.shine::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
		transform: translate(-150%, 150%);
		animation: ${shine} 1s ease-out forwards;
	}

	@keyframes shine {
		to {
			transform: translate(150%, -150%);
		}
	}
`;

export const GridElementOverlay = styled.div`
	height: 370px;
	width: calc(100% - 50px);
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 24.5px;
	left: 24.5px;
	display: flex;
	background: rgba(15, 15, 15, 0.55);
	backdrop-filter: blur(10px);
	border-radius: ${STYLING.dimensions.radius.alt2};

	svg {
		height: 150px;
		width: 150px;
		color: ${(props) => props.theme.colors.font.light1};
		fill: ${(props) => props.theme.colors.font.light1};
	}
`;

export const GridElementAction = styled.button`
	width: calc(100% - 20px);
	background: ${(props) => props.theme.colors.indicator.primary};
	padding: 10px 20px;
	border-radius: ${STYLING.dimensions.radius.primary};
	background: linear-gradient(180deg, #80f154, #bbe948, #efe13e);
	box-shadow: 0 0 25px 5px #80f154;
	transition: all 175ms;
	span {
		color: #0d3f0a;
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: 'Frank Ruhl Libre', serif;
	}

	&:hover {
		background: #7ec9bf;
		box-shadow: 0 0 25px 5px #666666;
		span {
			color: ${(props) => props.theme.colors.font.light1};
		}
	}

	&:disabled {
		background: #7ec9bf;
		box-shadow: 0 0 25px 5px #666666;
		border: 1px solid #7ec9bf;
		span {
			color: ${(props) => props.theme.colors.font.light1};
		}
	}
`;

export const PrimaryAsset = styled(GridElement)`
	img {
		height: 550px;
	}
`;

export const PrimaryAssetOverlay = styled(GridElementOverlay)`
	height: 550px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	background: rgba(15, 15, 15, 0.55);
	backdrop-filter: blur(10px);
	border-radius: 0;

	svg {
		height: 200px;
		width: 200px;
	}
`;

export const PrimaryAssetAction = styled(GridElementAction)`
	width: calc(100% - 40px);
`;

export const BodyLoading = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0 0 0;

	span {
		color: #7ec9bf;
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: 'Frank Ruhl Libre', serif;
	}
`;

export const PManageWrapper = styled.div`
	max-width: 550px;
`;

export const MWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	padding: 60px 20px 40px 20px;
	background: linear-gradient(180deg, #1b1924, #6147f4, #181624);
	border: 2.5px solid #a78d49;
	border-radius: ${STYLING.dimensions.radius.primary};
	img {
		height: 400px;
		margin: 20px 0;
	}
`;

export const MTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #cfb573;
	background-image: radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
	background-size: 3px 3px;
	padding: 7.5px 20px 10px 20px;
	border-radius: ${STYLING.dimensions.radius.alt2};
	p {
		color: #3e0600;
		font-size: 32px;
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-family: 'Frank Ruhl Libre', serif;
		text-align: center;
	}
	span {
		color: #54221d;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-family: 'Frank Ruhl Libre', serif;
		text-align: center;
	}
`;

export const MDescription = styled.div`
	padding: 0 20px;
	p {
		line-height: 1.5;
		color: #e6c35f;
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: 'Frank Ruhl Libre', serif;
		text-align: center;
	}
`;

export const MActionWrapper = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	button {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-family: 'Frank Ruhl Libre', serif;
		background: transparent;
		border: 1px solid #c0c0c0;
		color: #c0c0c0;
		padding: 5px 10px;
		border-radius: ${STYLING.dimensions.radius.alt2};
		transition: all 175ms;
		&:hover {
			color: #fff;
			border: 1px solid #fff;
		}
	}
`;
