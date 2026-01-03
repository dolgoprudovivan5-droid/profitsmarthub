
export const MenuSection = () => {
  return (
      <div className={"footer-section menu-section"}>
          <h3 className={"gradient-text"}
          style={{
              background: "linear-gradient(90deg, #3FEF00 -11.91%, #FFF 108.22%)"
          }}>МЕНЮ</h3>
          <nav className={"footer-nav"}>
              <a href="#main">
                  Главная
              </a>
              <a href="#advantages">
                  Преимущества
              </a>
              <a href="#formats">
                  Формат
              </a>
              <a href="#program">
                  Програма
              </a>
          </nav>
      </div>
  );
};
