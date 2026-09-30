/* =========================================================================
   ENTREOLHARES — SCRIPT COMPARTILHADO
   Cuida de duas coisas simples:
   1) abrir/fechar o menu no celular
   2) copiar a chave Pix com um clique (na Home)
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // ---- menu mobile ----
  var botaoMenu = document.querySelector(".botao-menu");
  var navPrincipal = document.querySelector(".nav-principal");

  if (botaoMenu && navPrincipal) {
    botaoMenu.addEventListener("click", function () {
      var aberto = navPrincipal.classList.toggle("aberto");
      botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

   // ---- copiar e-mail do rodapé (só onde tiver o atributo data-copiar-email) ----
  var linksEmail = document.querySelectorAll("[data-copiar-email]");
 
  linksEmail.forEach(function (link) {
    var textoOriginal = link.textContent;
 
    link.addEventListener("click", function (evento) {
      evento.preventDefault(); // não abre o programa de e-mail, só copia
      var email = link.getAttribute("data-copiar-email");
 
      var mostrarCopiado = function () {
        link.textContent = "E-mail copiado!";
        setTimeout(function () {
          link.textContent = textoOriginal;
        }, 2500);
      };
 
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(mostrarCopiado).catch(function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        // alternativa para navegadores mais antigos
        var campoTemporario = document.createElement("textarea");
        campoTemporario.value = email;
        document.body.appendChild(campoTemporario);
        campoTemporario.select();
        document.execCommand("copy");
        document.body.removeChild(campoTemporario);
        mostrarCopiado();
      }
    });
  });
 
  // ---- copiar chave Pix ----
  var botaoCopiar = document.querySelector("[data-copiar-pix]");
  var aviso = document.querySelector("[data-aviso-copia]");

  if (botaoCopiar) {
    botaoCopiar.addEventListener("click", function () {
      var chave = botaoCopiar.getAttribute("data-chave");

      var mostrarSucesso = function () {
        if (aviso) {
          aviso.textContent = "Chave copiada! Obrigado por apoiar. 💛";
          setTimeout(function () {
            aviso.textContent = "";
          }, 4000);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(chave).then(mostrarSucesso).catch(function () {
          if (aviso) aviso.textContent = "Não foi possível copiar. Copie manualmente.";
        });
      } else {
        // alternativa para navegadores mais antigos
        var campoTemporario = document.createElement("textarea");
        campoTemporario.value = chave;
        document.body.appendChild(campoTemporario);
        campoTemporario.select();
        document.execCommand("copy");
        document.body.removeChild(campoTemporario);
        mostrarSucesso();
      }
    });
  }
});
