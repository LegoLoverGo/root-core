{
  description = "A basic flake with a shell";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      rec {
        packages = {
          root-core = pkgs.mkYarnPackage rec {
            name = "root-core";
            src = ./.;
            packageJSON = ./package.json;

            distPhase = "true";
            buildPhase = ''
              yarn build
            '';

            postInstall = ''
              cp -r $out/libexec/${name}/deps/${name}/dist $out
            '';
          };

          container =
            let
              lighttpdConf = pkgs.writeText "lighttpd.conf" ''
                server.document-root = "${packages.root-core}/dist"
                server.port = 3000

                mimetype.assign = (
                  ".html" => "text/html"
                )
              '';
            in
            pkgs.dockerTools.buildImage {
              name = "website";
              tag = "latest";
              config = {
                Cmd = [ "${pkgs.lighttpd}/bin/lighttpd" "-D" "-f" "${lighttpdConf}" ];
              };
            };
        };

        defaultPackage = packages.root-core;

        devShell = pkgs.mkShell {
          buildInputs = [ ];
          nativeBuildInputs = with pkgs; [
            # Node
            nodejs
            yarn

            # Formatting
            nixpkgs-fmt
            nodePackages.prettier
          ];
        };
      });
}
