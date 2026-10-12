# Illustration prompts (Higgsfield, Seedream 5.0 Pro)

Status 2026-10-12: not generated. `seedream_v5_pro` returns `job_minimum_basic_plan_required` on the account's free plan (10 credits). Cost once unlocked: 2.5 credits per image at 2k, 1.25 at 1k.

Approach: every image is generated in black ink on white and tinted in CSS with the axis blue, so the palette stays under our control and the seven covers read as one set. No people, no real events, no symbols: the real record is carried by the episode photos; the illustrations only set mood.

Command (one per axis, run from this folder):

```
higgsfield generate create seedream_v5_pro --prompt "<prompt>" --aspect_ratio 4:3 --resolution 2k --wait
```

Shared style suffix, appended to every prompt:

> Monochrome editorial illustration rendered as a coarse halftone dot screen, black ink on pure white paper, high contrast, heavy grain, generous empty white space, object in the lower left of the frame. No text, no letters, no people, no flags, no religious or political symbols.

| Axis | File | Subject prompt |
|---|---|---|
| 01 Frustração | `01-frustracao.png` | A folded newspaper crumpled on a kitchen table next to a cold cup of coffee, morning side light. |
| 02 O registro | `02-registro.png` | An open archive drawer full of index cards, one card raised slightly, seen from above. |
| 03 A IHRA | `03-ihra.png` | A single memorial candle in a glass, lit, beside a closed heavy door. |
| 04 O projeto | `04-projeto.png` | A long row of identical plain shirts hanging on hangers in a dim wardrobe, receding into shadow. |
| 05 A companhia | `05-companhia.png` | A long banquet table with empty chairs and blank place cards, seen from one end. |
| 06 O governo | `06-governo.png` | An old studio microphone on a stand in front of a heavy theatre curtain. |
| 07 A ferradura | `07-ferradura.png` | A single old iron horseshoe on a bare wooden floor, long raking light from the left. |

Where they go once generated: the hero band, replacing the six-photo collage, or behind each cover's episode photo. Decide with Alice after seeing them.
