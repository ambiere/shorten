document.addEventListener("DOMContentLoaded", (e) => {
  const resourceAnchor = document.querySelector("#resource-link");
  const endpoints = document.querySelector("#endpoints");
  if (resourceAnchor) {
    window
      .fetch("version")
      .then((res) => res.json())
      .then((version) => {
        const date = new Date();
        resourceAnchor.setAttribute("href", `shorten/:shortId`);
        resourceAnchor.innerHTML = `<p>/headerparser/:shortId</p>`;
        endpoints.innerHTML = `   
            <p><span>GET /${getEndpointSegment(version)}/:shortId</span></p>
            <p><span>...</span></p>`;
      });

    function getEndpointSegment(obj) {
      if (obj.version !== undefined) {
        return `v${obj.version}/api/shorten`;
      }
    }
  }
});
