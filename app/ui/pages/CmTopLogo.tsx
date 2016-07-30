import React = require('react');
import { Link} from 'react-router';
import {Links} from '../links';
import {Data} from '../data';
class CmTopLogo extends React.Component<{}, {}> {
	render() {
		return <div className="imms-logo">
			<img src="/images/Imms%20Tree.png" />
		</div>;
	}
}

class CmMainHeading extends React.Component<{}, {}> {
	render() {
		return <div className="main-heading">
			<Link to={Links.home}>
				<h1 className="library-title">Imms</h1>
				<div className="b-library-subtitle">
					<h2 className="library-subtitle__text">
						Immutable collections for .NET
					</h2>
				</div>
			</Link>
		</div>;
	}
}

class CmFooterMenu extends React.Component<{}, {}> {
	render() {
		return <div className="footer-menu">
			<ul>
				<li><a href={Links.External.sources}>Imms on GitHub</a></li>
				<li><a href={Links.External.nuget}>Imms on NuGet</a></li>
			</ul>
		</div>;
	}
}

class CmFooter extends React.Component<{}, {}> {
	render() {
		return <div className="footer-box container">
			<div className="footer-box__menu">
				<CmFooterMenu/>
			</div>
			<div className="b-footer-box__author">
				Imms was created by <a href={Links.External.gregrosProfile}>@GregRos</a>, and is released under the MIT license.
			</div>
			<div className="b-footer-box__lang">
				Website in HTML, CSS, and Javascript, using the <a href={Links.External.webstorm}>WebStorm</a> IDE. 
				Sources on <a href={Links.External.siteSources}>GitHub</a>.
			</div>
			<div className="b-footer-box__techs">
				Some of the technologies used by this website: <a href={Links.External.bootstrap}>Bootstrap</a>,
				<a href={Links.External.typescript}>TypeScript</a>,
				<a href={Links.External.sass}>Sass/SCSS</a>,
				<a href={Links.External.react}>ReactJS</a>.
			</div>
		</div>;
	}
}

class CmForkMe extends React.Component<{}, {}> {
	render() {
		return <a href={Links.External.sources}>
			<img data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" className="imms-github-forkme" />
		</a>;
	}
}

class CmDownloadBox extends React.Component<{}, {}> {
	render() {
		return <div className="download-box">
			<Link to={Links.getImms}>
				<div className="download-box__symbol">
				</div>
				<div className="download-box__text">
					Get Imms
				</div>
				<div className="download-box__version">
					Version {Data.version}
				</div>
			</Link>
		</div>;
	}
}

class CmDownloadOptions extends React.Component<{}, {}> {
	render() {
		return <div className="down-options">
			<div className="down-options__col">
				<a href={Links.External.nuget}>
					<div className="down-option down-option--nuget down-option--primary">
						<div className="down-option__icon">
							<img src="/images/nugetlogo.png" />
						</div>
						<h3 className="down-option__title">
							NuGet
						</h3>
						<div className="down-option__content">
							The best way to get the latest version of Imms is through NuGet.
						</div>
					</div>
				</a>
			</div>
			<div className="down-options__col">
				<a href={Links.External.binaries}>
					<div className="down-option down-option--binaries">
						<div className="down-option__icon">
							<img src="/images/zip.png" />
						</div>
						<h3 className="down-option__title">
							Binaries
						</h3>
						<div className="down-option__content">
							You can also download the binaries directly in a zip file.
						</div>
					</div>
				</a>
			</div>
			<div className="down-options__col">
				<a href={Links.External.sources}>
					<div className="down-option down-option--sources">
						<div className="down-option__icon">
							<img src="/images/GitHub_Logo.png" />
						</div>
						<h3 className="down-option__title">
							Sources
						</h3>
						<div className="down-option__content">
							You could even get the sources and include them in your solution directly.
						</div>
					</div>
				</a>
			</div>
		</div>;
	}
}

import {CmArticleTree} from '../navbar/CmArticleNav';
import { CmMathjaxMacros} from '../CmMathjaxMacros';
class CmTopNavBar extends React.Component<{}, {}> {
	render() {
		return <ul className="top-navbar">
			<li className="top-navbar__item">
				<h4>
					<Link href={Links.whyImmutable}>
						Why Immutable?
					</Link>
				</h4>
			</li>
			<li className="top-navbar__item">
				<h4>
					<Link href={Links.whyImms}>
						Why Imms?
					</Link>
				</h4>
			</li>
			<li className="top-navbar__item">
				<h4>
					<Link href={Links.general}>
						Documentation
					</Link>
				</h4>
			</li>
			<li className="top-navbar__item">
				<h4>
					<Link href={Links.getImms}>
						Get Imms
					</Link>
				</h4>
			</li>
		</ul>;
	}
}

const mathjaxDefs = `
    |newcommand{|amr}{ {^|text{amr}}}
    |newcommand{|fast}{⚡}
    |newcommand{|fastt}{⚡⚡}
    |newcommand{|u}[1]{|underline{ #1}}
    |newcommand{|o}[1]{|overline{ #1}}
`.replace("|", "\\");

export class PgArticle extends React.Component<{}, {}> {
	render() {
		return <div class="imms-root">
			<CmMathjaxMacros>
				{mathjaxDefs}
			</CmMathjaxMacros>
			<CmForkMe/>
			<div class="title-backdrop">
				<div class="title-box">
					<div class="title-row">
						<CmTopLogo/>
						<CmMainHeading/>
						<CmDownloadBox/>
					</div>
					<CmTopNavBar/>
				</div>
			</div>
			<div class="central-backdrop">

				<div class="central-layout">
					<div class="central-nav-column-box">
						Test
					</div>
					<div class="central-text">
						Hi
					</div>
				</div>
			</div>
			<div class="footer-backdrop">
				<CmFooter/>
			</div>
		</div>;

	}
}
