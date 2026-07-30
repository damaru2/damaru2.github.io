(() => {
  const data = [
  {
    "n_players": 3,
    "one_life": 1,
    "two_lives": 0,
    "other_lives": 4,
    "total": 5
  },
  {
    "n_players": 4,
    "one_life": 4,
    "two_lives": 1,
    "other_lives": 8,
    "total": 13
  },
  {
    "n_players": 5,
    "one_life": 1,
    "two_lives": 19,
    "other_lives": 6,
    "total": 26
  },
  {
    "n_players": 6,
    "one_life": 5,
    "two_lives": 22,
    "other_lives": 4,
    "total": 31
  },
  {
    "n_players": 7,
    "one_life": 2,
    "two_lives": 14,
    "other_lives": 2,
    "total": 18
  },
  {
    "n_players": 8,
    "one_life": 2,
    "two_lives": 6,
    "other_lives": 0,
    "total": 8
  },
  {
    "n_players": 9,
    "one_life": 6,
    "two_lives": 8,
    "other_lives": 0,
    "total": 14
  },
  {
    "n_players": 10,
    "one_life": 4,
    "two_lives": 7,
    "other_lives": 0,
    "total": 11
  },
  {
    "n_players": 11,
    "one_life": 3,
    "two_lives": 1,
    "other_lives": 0,
    "total": 4
  },
  {
    "n_players": 12,
    "one_life": 5,
    "two_lives": 4,
    "other_lives": 0,
    "total": 9
  },
  {
    "n_players": 13,
    "one_life": 3,
    "two_lives": 3,
    "other_lives": 0,
    "total": 6
  },
  {
    "n_players": 14,
    "one_life": 1,
    "two_lives": 0,
    "other_lives": 0,
    "total": 1
  },
  {
    "n_players": 17,
    "one_life": 2,
    "two_lives": 0,
    "other_lives": 0,
    "total": 2
  },
  {
    "n_players": 19,
    "one_life": 0,
    "two_lives": 1,
    "other_lives": 0,
    "total": 1
  }
];
  const totalPlayed = 149;
  const root = document.getElementById("lycanthrobot-configurations-chart");
  if (!root || !data.length) return;

  const colors = {
    one_life: "#2f6f73",
    two_lives: "#c5534d",
    other_lives: "#7b6aa8"
  };
  const labels = {
    one_life: "1 life",
    two_lives: "2 lives",
    other_lives: "3+ lives"
  };
  const width = 960;
  const height = 560;
  const margin = { top: 76, right: 28, bottom: 72, left: 64 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxCount = Math.max(...data.map((d) => d.total), 1);
  const slot = chartWidth / data.length;
  const barWidth = Math.max(24, Math.min(52, slot * 0.74));
  const y = (count) => margin.top + chartHeight - (count / maxCount) * chartHeight;
  const fmt = new Intl.NumberFormat();

  const ticks = Array.from({ length: 6 }, (_, i) => Math.round((maxCount * i) / 5));
  const grid = ticks.map((tick) => {
    const yy = y(tick);
    return `<g>
      <line x1="${margin.left}" y1="${yy}" x2="${width - margin.right}" y2="${yy}" />
      <text x="${margin.left - 12}" y="${yy + 4}">${tick}</text>
    </g>`;
  }).join("");

  const bars = data.map((d, index) => {
    const x = margin.left + index * slot + slot / 2 - barWidth / 2;
    let yCursor = margin.top + chartHeight;
    const rects = ["one_life", "two_lives", "other_lives"].map((key) => {
      const count = d[key];
      if (!count) return "";
      const h = (count / maxCount) * chartHeight;
      yCursor -= h;
      return `<rect class="lycanthrobot-chart-segment" x="${x}" y="${yCursor}" width="${barWidth}" height="${h}" fill="${colors[key]}" rx="2">
        <title>${d.n_players} players, ${labels[key]}: ${fmt.format(count)} games</title>
      </rect>`;
    }).join("");
    return `<g>
      ${rects}
      <text class="lycanthrobot-chart-x" x="${x + barWidth / 2}" y="${margin.top + chartHeight + 22}">${d.n_players}</text>
    </g>`;
  }).join("");

  const legendPositions = [0, 126, 266];
  const legend = ["one_life", "two_lives", "other_lives"].map((key, index) => {
    const x = margin.left + legendPositions[index];
    return `<g transform="translate(${x}, 38)">
      <rect width="13" height="13" rx="3" fill="${colors[key]}"></rect>
      <text x="21" y="11">${labels[key]}</text>
    </g>`;
  }).join("");

  root.innerHTML = `
    <style>
      #lycanthrobot-configurations-chart {
        margin: 2rem 0;
        max-width: 980px;
      }
      #lycanthrobot-configurations-chart .chart-frame {
        border: 1px solid #e0d8cb;
        border-radius: 14px;
        background: #fbfaf7;
        padding: 1rem;
        box-shadow: 0 10px 28px rgba(31, 41, 55, 0.08);
      }
      #lycanthrobot-configurations-chart svg {
        display: block;
        width: 100%;
        height: auto;
      }
      #lycanthrobot-configurations-chart .chart-title {
        fill: #1f2933;
        font: 700 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #lycanthrobot-configurations-chart .chart-legend text {
        fill: #667085;
        font: 400 20px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #lycanthrobot-configurations-chart .chart-label {
        fill: #344054;
        font: 650 20px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #lycanthrobot-configurations-chart .chart-axis {
        stroke: #344054;
        stroke-width: 1.2;
      }
      #lycanthrobot-configurations-chart .chart-grid line {
        stroke: #e7e0d5;
      }
      #lycanthrobot-configurations-chart .chart-grid text,
      #lycanthrobot-configurations-chart .lycanthrobot-chart-x {
        fill: #5c6673;
        font: 12px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        text-anchor: middle;
      }
      #lycanthrobot-configurations-chart .chart-grid text {
        text-anchor: end;
      }
      #lycanthrobot-configurations-chart .lycanthrobot-chart-segment {
        transition: opacity 140ms ease;
      }
      #lycanthrobot-configurations-chart svg:hover .lycanthrobot-chart-segment {
        opacity: 0.82;
      }
      #lycanthrobot-configurations-chart .lycanthrobot-chart-segment:hover {
        opacity: 1;
      }
    </style>
    <div class="chart-frame">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="lycanthrobot-chart-title lycanthrobot-chart-desc">
        <title id="lycanthrobot-chart-title">Lycanthrobot game configurations by player count</title>
        <desc id="lycanthrobot-chart-desc">Stacked histogram of recorded game configurations. The x axis is number of players and the y axis is game count. Bar colors split games by lives per player.</desc>
      <text class="chart-title" x="${margin.left}" y="26">Lycanthrobot game configurations (Total played: ${totalPlayed})</text>
        <g class="chart-legend">${legend}</g>
        <g class="chart-grid">${grid}</g>
        <line class="chart-axis" x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${width - margin.right}" y2="${margin.top + chartHeight}" />
        <line class="chart-axis" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}" />
        ${bars}
        <text class="chart-label" x="${margin.left + chartWidth / 2}" y="${height - 20}" text-anchor="middle">number of players</text>
        <text class="chart-label" x="20" y="${margin.top + chartHeight / 2}" text-anchor="middle" transform="rotate(-90 20 ${margin.top + chartHeight / 2})">games</text>
      </svg>
    </div>
  `;
})();