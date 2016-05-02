String.prototype.wordwrap = function(maxChars, brk){
  var ret = [];
  var words = this.split(/\b/);

  var currentLine = '';
  var lastWhite = '';
  words.forEach(function(d) {
      var prev = currentLine;
      currentLine += lastWhite + d;

      var l = currentLine.length;

      if (l > maxChars) {
          ret.push(prev.trim());
          currentLine = d;
          lastWhite = '';
      } else {
          var m = currentLine.match(/(.*)(\s+)$/);
          lastWhite = (m && m.length === 3 && m[2]) || '';
          currentLine = (m && m.length === 3 && m[1]) || currentLine;
      }
  });

  if (currentLine) {
      ret.push(currentLine.trim());
  }

  return ret.join(brk);
}

String.prototype.truncate = function( n, useWordBoundary ){
   var isTooLong = this.length > n,
       s_ = isTooLong ? this.substr(0,n-1) : this;
   s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
   return  isTooLong ? s_ + '&hellip;' : s_;
};
