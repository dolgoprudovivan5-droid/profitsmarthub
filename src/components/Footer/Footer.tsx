import {MenuSection} from "./FooterSections/MenuSection";
import {SocialsSection} from "./FooterSections/SocialsSection";
import { assets } from "@/assets/images/assets"
import "@/styles/footer.css"

export function Footer() {
    return (
        <footer>
            <MenuSection/>
            <SocialsSection/>

            <div className={"footer-section"}>
                <h3 className={"gradient-text"}
                    style={{
                        background: "linear-gradient(90deg, #3FEF00 12.09%, #FFF 99.98%)"
                    }}
                >Made By</h3>
                {assets.mipo}
            </div>
        </footer>
    );
}

export default Footer;

