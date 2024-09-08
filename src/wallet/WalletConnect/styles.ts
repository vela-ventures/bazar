import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	position: relative;
	animation: ${open} ${fadeIn2};
`;

export const PWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const CAction = styled.div`
	margin: 0 15px 0 0;

	button {
		span {
			font-family: ${(props) => props.theme.typography.family.alt1};
			font-size: ${(props) => props.theme.typography.size.small};
			font-weight: ${(props) => props.theme.typography.weight.bold};
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const LAction = styled.button`
	height: 35px;
	padding: 0 17.5px;
	margin: 0 15px 0 0;
	display: none;
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		display: block;
	}
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active};
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const FlexAction = styled.div`
	display: flex;
	align-items: center;
	svg {
		height: 25px;
		width: 20px;
		margin: 0 -2.5px 0 11.5px;
	}
`;

export const Dropdown = styled.ul`
	max-height: 85vh;
	width: 325px;
	max-width: 75vw;
	padding: 15px 0 10px 0;
	position: absolute;
	top: 45px;
	right: 0px;
	border-radius: ${STYLING.dimensions.radius.primary};
`;

export const DHeaderWrapper = styled.div`
	width: 100%;
	padding: 0 15px 15px 15px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.alt4};
`;

export const DHeaderFlex = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

export const DHeader = styled.div`
	margin: 0 0 0 10px;
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		&:hover {
			color: ${(props) => props.theme.colors.font.alt1};
		}
	}
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		&:hover {
			color: ${(props) => props.theme.colors.font.primary};
		}
	}
	p,
	span {
		transition: all 100ms;
		&:hover {
			cursor: pointer;
		}
	}
`;

export const DBodyWrapper = styled.ul`
	width: 100%;
	padding: 10px 5px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.alt4};
	li {
		text-align: center;
		height: 40px;
		display: flex;
		align-items: center;
		cursor: pointer;
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		border: 1px solid transparent;
		border-radius: ${STYLING.dimensions.radius.primary};
		transition: all 100ms;
		padding: 0 7.5px;
		svg {
			height: 15.5px;
			width: 15.5px;
			margin: 6.5px 8.5px 0 0;
			color: ${(props) => props.theme.colors.font.alt1};
			fill: ${(props) => props.theme.colors.font.alt1};
		}
		&:hover {
			color: ${(props) => props.theme.colors.font.primary};
			background: ${(props) => props.theme.colors.container.primary.active};
		}

		a {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			border-radius: ${STYLING.dimensions.radius.primary};
			&:hover {
				color: ${(props) => props.theme.colors.font.primary};
				background: ${(props) => props.theme.colors.container.primary.active};
			}
		}
	}
`;

export const DBalancesWrapper = styled(DBodyWrapper)`
	padding: 10px 15px;
`;

export const DBodyHeader = styled.div`
	margin: 0 0 2.5px 0;
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const BalanceLine = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
	svg {
		height: 16.5px;
		width: 16.5px;
		margin: 7.5px 7.5px 0 0;
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};
	}
	.pixl-icon {
		svg {
			fill: ${(props) => props.theme.colors.font.light1};
		}
	}
`;

export const TokenLink = styled.div`
	margin: 0 0 0 auto;
	a {
		background: ${(props) => props.theme.colors.button.primary.background};
		border: 1px solid ${(props) => props.theme.colors.button.primary.border};
		padding: 0.5px 10.5px 2.5px 10.5px;
		border-radius: 36px;
		&:hover {
			background: ${(props) => props.theme.colors.button.primary.active.background};
			border: 1px solid ${(props) => props.theme.colors.button.primary.active.border};
			span {
				color: ${(props) => props.theme.colors.button.primary.active.color} !important;
			}
		}
		&:focus {
			background: ${(props) => props.theme.colors.button.primary.active.background};
			border: 1px solid ${(props) => props.theme.colors.button.primary.active.border};
			span {
				color: ${(props) => props.theme.colors.button.primary.active.color} !important;
			}
		}
		&:disabled {
			background: ${(props) => props.theme.colors.button.primary.disabled.background};
			border: 1px solid ${(props) => props.theme.colors.button.primary.disabled.border};
			span {
				color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
			}
			svg {
				color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
			}
		}

		span {
			width: fit-content;
			text-overflow: ellipsis;
			overflow: hidden;
			font-family: ${(props) => props.theme.typography.family.primary} !important;
			font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
			font-weight: ${(props) => props.theme.typography.weight.bold} !important;
			color: ${(props) => props.theme.colors.button.primary.color} !important;
		}
	}
`;

export const DFooterWrapper = styled(DBodyWrapper)`
	border-bottom: none;
	svg {
		height: 15.5px;
		width: 15.5px;
		margin: 6.5px 8.5px 0 0;
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const PManageWrapper = styled.div`
	max-width: 550px;
`;
