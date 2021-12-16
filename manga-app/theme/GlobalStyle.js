import { createGlobalStyle } from 'styled-components'
import { mqSm, mqMd, mqLg } from './styleVars';


const GlobalStyle = createGlobalStyle`

	:root{
		--page-header-height: 4rem;
		--ThemeChangerBG: #02a6f2;
		--ThemeChangerBefore: translateY(-50%) scale(1);
		--ThemeChangerAfter: translateY(70%);
		
		--nav-color: #fff;
        --nav-bg: #222;
        --nav-border-color: #111;
		--nav-item-color: #c6c6c6;

		--body-bg: #f9f9f9;
		--body-color: #222;

		--login-border-color: black;

		--latestMangas-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);;

        --mangaPreview-genre-text: #af00ff;
        --mangaPreview-genre-text-hover: #ffffff;
        --mangaPreview-genre-font-weight: 400;
        --mangaPreview-genre-bg-hover: #af00ff;
        --mangaPreview-genre-border: 1px solid;
        --mangaPreview-genre-border-color: #af00ff;
		--mangaPreview-link-color: #af00ff;

        --manga-bg: #ffffff;
        --manga-border: 1px solid;
        --manga-border-color: #eee;
        --manga-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        --manga-altNames: #a0a0a0;
        --manga-latestChapter-text: #f90;
        --manga-latestChapter-text-hover: #b36b00;
		--mangaPreview-genre-author-text: #a0a0a0;
		--manga-tab-bg: transparent;
		--manga-tab-bg-hover: #eee;
		--manga-tab-bg-active: #f90;
		--manga-tab-text: #f90;
		--manga-tab-text-hover: #b36b00;
		--manga-tab-text-active: #fff;
		--manga-chapterLink-bg: "";
		--manga-chapterLink-bg-hover: #f5f5f5;
		--manga-chapterLink-border: 1px solid;
		--manga-chapterLink-border-color: #f5f5f5;
		--manga-chapterLink-chapterName-text: #222
		--manga-chapterLink-chapterNum-text: #af00ff;
		--manga-chapterLink-chapterUpdatedAt-text: #a0a0a0;

		--chapter-fixed-navigation-bg: #222;
		--chapter-fixed-navigation-bg-hover: #090909;
		--chapter-fixed-navigation-border: 1px solid;
		--chapter-fixed-navigation-border-color: #090909;
		--chapter-fixed-navigation-text: #a0a0a0;
		--chapter-fixed-navigation-text-hover: #ffffff;
		--chapter-fixed-navigation-pagination-border-width: 0 1px;
		--chapter-fixed-navigation-pagination-border-color: #555;
		--chapter-fixed-navigation-pagination-border-style: solid;
		--chapter-fixed-navigation-pagination-bg: #222;
		
		@media ${mqLg},${mqMd} {
			--headerHeight: 4.5rem;
			
		}

		@media ${mqSm} {
			--headerHeight: 3.75rem;
		}

		--fullPageHeight: calc(100vh - var(--headerHeight) - 1px);
	}

	[data-theme="dark"], 
	[data-theme="dark"] body{
		--ThemeChangerBG: #000;
		

		--body-bg: #2d2d2d;
		--body-color: #eee;

		--nav-color: #fff;
        --nav-bg: #222;
        --nav-border-color: #111;

		--login-border-color: white;

		--latestMangas-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);

        --mangaPreview-genre-text: #af00ff;
        --mangaPreview-genre-text-hover: #ffffff;
        --mangaPreview-genre-author-text: #a0a0a0;
        --mangaPreview-genre-font-weight: 400;
        --mangaPreview-genre-bg-hover: #af00ff;
        --mangaPreview-genre-border: 1px solid;
        --mangaPreview-genre-border-color: #af00ff;
        --mangaPreview-link-color: #af00ff;

        --manga-bg: #18191a;
        --manga-border: 1px solid;
        --manga-border-color: #777;
        --manga-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        --manga-altNames: #a0a0a0;
        --manga-latestChapter-text: #f90;
        --manga-latestChapter-text-hover: #b36b00;
		--manga-tab-bg: transparent;
		--manga-tab-bg-hover: #eee;
		--manga-tab-bg-active: #f90;
		--manga-tab-text: #f90;
		--manga-tab-text-hover: #b36b00;
		--manga-tab-text-active: #fff;
		--manga-chapterLink-bg: "";
		--manga-chapterLink-bg-hover: #2d2d2d;
		--manga-chapterLink-border: 1px solid;
		--manga-chapterLink-border-color: #777;
		--manga-chapterName-text: #eee;
		--manga-chapterNum-text: #af00ff;
		--manga-chapterUpdatedAt-text: #a0a0a0;

		--chapter-fixed-navigation-bg: #222;
		--chapter-fixed-navigation-bg-hover: #090909;
		--chapter-fixed-navigation-border: 1px 0 0;
		--chapter-fixed-navigation-border-color: #090909;
		--chapter-fixed-navigation-text: #a0a0a0;
		--chapter-fixed-navigation-text-hover: #ffffff;
		--chapter-fixed-navigation-pagination-border-width: 0 1px;
		--chapter-fixed-navigation-pagination-border-color: #555;
		--chapter-fixed-navigation-pagination-border-style: solid;
		--chapter-fixed-navigation-pagination-bg: #222;
	}



	html{
		font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
		height: 100%; 
		
	}
	
	body {
		height: 100%;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow-y:scroll;
		overflow-x: hidden;
		background-color: var(--body-bg);
		color: var(--body-color);
		font-family: inherit;
	

		@media ${mqLg},${mqMd}  {
				font-size: calc(0.65em + 0.15vmin);
				font-size: clamp(11px,0.85vw,30px);
			}
			
		@media ${mqSm} {
			font-size: calc(0.9em + 0.5vmin);
			font-size: clamp(8px,2.5vw,30px);
		}

	}

	#__next{
		height: 100%;
	}

	.text-gray{ 
		color: rgba(209,213,219,1)
	}

	.hero{
		display:flex;
		flex-flow: column nowrap;
		justify-content: space-between
	}




	main, .navbar-container {
        margin:0 auto;
        @media (min-width: 1200px) {
            max-width: 1170px;
        }
        @media (min-width: 992px) and (max-width: 1199px) {
            max-width: 970px;
        }
        @media (min-width: 769px) and (max-width: 991px) {
            max-width: 750px;
        }
        @media (max-width: 768px) {
            max-width: 100%;
          
        }
    }

	main{
		height: calc(100% - var(--page-header-height));
		@media ${mqLg}, ${mqMd} {

		}

		@media ${mqSm} {
		}
	}


	[data-theme="dark"],
	[data-theme="dark"] body {
		--headerBorderBottom: 1px solid rgba(75,85,99,1);
		--ThemeChangerBefore: translate(calc(100% + 0.05em), -50%) scale(.3);
		--ThemeChangerAfter: translateY(calc(-100% - -0.85rem));
		--projectShadow: 10px 10px 0 rgb(0 0 0 / 25%);
		--projectTitle: white;


		.text-gray{ 
			color: rgba(75,85,99,1)
		}
	}

	h1,h2,h3,h4,h5,h6{
		margin:0; padding:0;
	}

	ul {
		margin:0; padding:0; 

		li{
			list-style:none;
		}
	}

	button,a {
		text-decoration: none;
		appearance: none;
		outline:none;
		border:none;
		background-color: transparent;
		color: inherit;
		cursor: pointer;
		box-sizing: border-box;
		font-family:inherit;
		padding:0;
		margin:0;
	}

	p{
		margin: 0;
		padding: 0;
	}



	.desktop{
		@media ${mqSm} {
			display: none;
		}

		@media ${mqLg},${mqMd} {
			display: block;
		}
	}
	.desktopFlex{
		@media ${mqSm} {
			display: none;
		}

		@media ${mqLg},${mqMd} {
			display: flex;
		}
	}

	.desktopInline{
		@media ${mqSm} {
			display: none;
		}

		@media ${mqLg},${mqMd} {
			display: inline;
		}
	}

	.mobile{
		@media ${mqSm} {
			display: block;
		}

		@media ${mqLg},${mqMd} {
			display: none;
		}
	}

	.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
}

	.mb-025{
		margin-bottom: 0.25rem;
	}
	.mb-05{
		margin-bottom: 0.5rem;
	}
	.mb-075{
		margin-bottom: 0.75rem;
	}
	.mb-1{
		margin-bottom: 1rem;
	}
	.mb-2{
		margin-bottom: 2rem;
	}
	.mb-3{
		margin-bottom: 3rem;
	}
	.mb-4{
		margin-bottom: 4rem;
	}
	.mb-5{
		margin-bottom: 5rem;
	}
	.mb-10{
		margin-bottom: 10rem;
	}

	.mr-025{
		margin-right: 0.25rem;
	}
	.mr-05{
		margin-right: 0.5rem;
	}
	.mr-075{
		margin-right: 0.75rem;
	}
	.mr-1{
		margin-right: 1rem;
	}
	.mr-2{
		margin-right: 2rem;
	}
	.mr-3{
		margin-right: 3rem;
	}
	.mr-4{
		margin-right: 4rem;
	}
	.mr-5{
		margin-right: 5rem;
	}
	.mr-10{
		margin-right: 10rem;
	}

`

export default GlobalStyle;